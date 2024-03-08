using ExamBanking.DTO.AccountDto;
using ExamBanking.Models;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace ExamBanking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ExamBankingContext _context;
        private readonly IConfiguration _configuration;
        public LoginController(ExamBankingContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpGet("signin-google")]
        public async Task<IActionResult> GoogleCallback()
        {
            // Xác thực thông tin người dùng từ Google
            var authenticateResult = await HttpContext.AuthenticateAsync(GoogleDefaults.AuthenticationScheme);

            if (!authenticateResult.Succeeded)
            {
                // Xử lý lỗi xác thực
                return RedirectToAction("LoginFailure");
            }

            // Lấy thông tin người dùng từ payload
            var email = authenticateResult.Principal.FindFirst(ClaimTypes.Email)?.Value;

            // Kiểm tra xem người dùng đã tồn tại trong cơ sở dữ liệu chưa
            var existingUser = _context.Accounts.Any(a => a.Email == email);

            if (!existingUser)
            {
                // Nếu người dùng không tồn tại, thêm mới vào cơ sở dữ liệu
                var newUser = new Account
                {
                    Email = email,
                    // Thêm các trường khác nếu cần
                };

                _context.Accounts.Add(newUser);
                _context.SaveChanges();
            }

            // Sinh JWT token và trả về

            return Ok(CreateRandomToken());
        }

        [HttpGet("google")]
        public IActionResult Login()
        {
            // Chỉ cần decorate action này với [Authorize] để chuyển hướng đến Google Authentication
            return Challenge(new AuthenticationProperties { RedirectUri = "https://localhost:7064/signin-google" });
        }

        [HttpGet("LogoutGoogle")]
        public IActionResult Logout()
        {
            // Xử lý đăng xuất
            return SignOut(new AuthenticationProperties { RedirectUri = "/" },
                CookieAuthenticationDefaults.AuthenticationScheme);
        }
        //[HttpGet("google")]
        //public IActionResult GoogleLogin()
        //{
        //    var properties = new AuthenticationProperties
        //    {
        //        RedirectUri = Url.Action(nameof(GoogleResponse)),
        //    };
        //    return Challenge(properties, GoogleDefaults.AuthenticationScheme);
        //}

        //[HttpGet("google-response")]
        //public async Task<IActionResult> GoogleResponse()
        //{
        //    // Xử lý thông tin người dùng từ Google
        //    var userInfo = await HttpContext.AuthenticateAsync(GoogleDefaults.AuthenticationScheme);

        //    // Thực hiện xử lý người dùng và trả về thông tin cần thiết
        //    var responseData = new { userInfo.Principal.Identity.Name, userInfo.Principal.Claims };

        //    // Thêm CORS header để cho phép frontend nhận được phản hồi từ backend
        //    Response.Headers.Add("Access-Control-Allow-Origin", "http://localhost:3000"); // Thay đổi thành địa chỉ frontend của bạn

        //    return Ok(responseData);
        //}

        [HttpPost("register")]
        public async Task<IActionResult> Regeister(UserRegisterRequest request) //AccountDto tương đương với 1 table trong database là UserRegisterRequest
        {
            if (_context.Accounts.Any(u => u.Email == request.Email))
            {
                return BadRequest("User already exist");
            }
            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            var account = new Account
            {
                Email = request.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                VerificationToken = CreateRandomToken()

            };

            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();
            return Ok("user created succesfully");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginRequest request)
        {
            var account = await _context.Accounts.SingleOrDefaultAsync(a => a.Email == request.Email);
            if (account == null)
            {
                return BadRequest("User not found!");
            }
            if (!VerifyPasswordHash(request.Password, account.PasswordSalt, account.PasswordHash))
            {
                return BadRequest("wrong pass");
            }
            if (account.Datejoin == null)
            {
                return BadRequest("Not verified");
            }

            string jwtToken = CreateJWTToken(account);
            return Ok(jwtToken);
        }
        [HttpPost("verify")]
        public async Task<IActionResult> Verify(string token)
        {
            var account = await _context.Accounts.SingleOrDefaultAsync(a => a.VerificationToken == token);
            if (account == null)
            {
                return BadRequest("Invalid token");
            }
            account.Datejoin = DateTime.Now;
            await _context.SaveChangesAsync();
            return Ok("User verify!");

        }
        [HttpPost("forgotPass")]
        public async Task<IActionResult> forgotPass(string email)
        {
            var account = await _context.Accounts.SingleOrDefaultAsync(u => u.Email == email);
            if (account == null)
            {
                return BadRequest("User not found");
            }
            account.PasswordResetToken = CreateRandomToken();
            account.ResetTokenExpires = DateTime.Now.AddMilliseconds(60);
            await _context.SaveChangesAsync();

            return Ok("User verify!");
        }
        [HttpPost("resetPass")]
        public async Task<IActionResult> resetPass(ResetPasswordRequest request)
        {
            var account = await _context.Accounts.FirstOrDefaultAsync(u => u.PasswordResetToken == request.Token);// sửa
            if (account == null)
            {
                return BadRequest("Invalid token");
            }
            if (account.ResetTokenExpires < DateTime.Now)
            {
                return BadRequest("token is expired");
            }
            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
            account.PasswordHash = passwordHash;
            account.PasswordSalt = passwordSalt;
            account.PasswordResetToken = null;
            account.ResetTokenExpires = null;
            await _context.SaveChangesAsync();

            return Ok("Password change succes!!");
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        /// <summary>
        /// hàm tạo token để verify mail
        /// </summary>
        /// <returns>trả về 1 token đã được ngẫu nhiên</returns>
        private string CreateRandomToken()
        {
            return Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
        }
        private string CreateJWTToken(Account user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, "Admin"),
                new Claim(ClaimTypes.Role, "")
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}
