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
    public class AuthController : ControllerBase
    {
        private readonly ExamBankingContext _context;
        private readonly IConfiguration _configuration;
        public AuthController(ExamBankingContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Regeister(UserRegisterRequest request) //AccountDto tương đương với 1 table trong database là UserRegisterRequest
        {
            string password = BCrypt.Net.BCrypt.HashPassword(request.Password);
            if (_context.Accounts.Any(u => u.Email == request.Email))
            {
                return BadRequest("User already exist");
            }


            var account = new Account
            {
                Accid = 1,
                Email = request.Email,
                Userpass = password,
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

            //if (!BCrypt.Net.BCrypt.Verify(request.Password, account.Userpass))
            //{
            //    return BadRequest("Wrong password.");
            //}

            string token = CreateJWTToken(account);

            return Ok(token);
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

            account.Userpass = BCrypt.Net.BCrypt.HashPassword(request.Password);
            account.PasswordResetToken = null;
            account.ResetTokenExpires = null;
            await _context.SaveChangesAsync();

            return Ok("Password change succes!!");
        }



        private string CreateRandomToken()
        {
            return Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
        }
        private string CreateJWTToken(Account user)
        {
            List<Claim> claims = new List<Claim> {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, "User")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSetting:Token").Value!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                   
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}
