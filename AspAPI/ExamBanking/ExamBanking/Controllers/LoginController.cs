using ExamBanking.DTO.AccountDto;
using ExamBanking.Models;
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
        public LoginController(ExamBankingContext context)
        {
            _context = context;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Regeister(UserRegisterRequest request) //AccountDto tương đương với 1 table trong database là UserRegisterRequest
        {
            if (_context.Accounts.Any(u => u.Email == request.Email))
            {
                return BadRequest("User already exist");
            }
            CreatedPasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

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
            if (account.Datejoin == null)
            {
                return BadRequest("Not verified");
            }
            if (!VerifyPasswordHash(request.Password, account.PasswordSalt, account.PasswordHash))
            {
                return BadRequest("wrong pass");
            }
            return Ok("nice");
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
            var account = await _context.Accounts.SingleOrDefaultAsync(u => u.Email == email);// sửa
            if (account == null)
            {
                return BadRequest("User not found");
            }
            account.PasswordResetToken = CreateRandomToken();
            account.ResetTokenExpires = DateTime.Now.AddDays(1);
            await _context.SaveChangesAsync();

            return Ok("User verify!");
        }
        [HttpPost("resetPass")]
        public async Task<IActionResult> resetPass(ResetPasswordRequest request)
        {
            var account = await _context.Accounts.FirstOrDefaultAsync(u => u.PasswordResetToken == request.Token);// sửa
            if (account == null || account.ResetTokenExpires < DateTime.Now)
            {
                return BadRequest("Invalid token");
            }
            CreatedPasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
            account.PasswordHash = passwordHash;
            account.PasswordSalt = passwordSalt;
            account.PasswordResetToken = null;
            account.ResetTokenExpires = null;
            await _context.SaveChangesAsync();

            return Ok("Password change succes!!");
        }
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA256(passwordSalt))
            {

                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }
        /// <summary>
        /// hàm tạo mã hóa
        /// </summary>
        /// <param name="password"></param>
        /// <param name="passwordHash"></param>
        /// <param name="passwordSalt"></param>
        private void CreatedPasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA256())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
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
    }
}
