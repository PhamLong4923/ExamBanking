using ExamBanking.Models;
using ExamBanking.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExamBanking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ExamBankingContext _context;
        public AccountController(ExamBankingContext context)
        {
            _context = context;
        }
        [Authorize(Roles = "User")]
        [HttpGet("NewBie")]
        public async Task<IActionResult> getIsnewbie()
        {
            var userId = Jwt.GetUserIdFromToken(Request.Headers["Authorization"]);

            var user = _context.Accounts.SingleOrDefault(u => u.Email == userId);
            if (user != null)
            {
                return Ok(user.Isnewbie);
            }

            return BadRequest("user not found");
        }
        [Authorize(Roles = "User")]
        [HttpPost("UpdateIsnewUser")]
        public async Task<IActionResult> UpdateIsnewUser()
        {
            var userId = Jwt.GetUserIdFromToken(Request.Headers["Authorization"]);

            // Sử dụng userId để truy vấn người dùng từ cơ sở dữ liệu
            var user = _context.Accounts.SingleOrDefault(u => u.Email == userId);
            if (user != null)
            {
                user.Isnewbie = 0;
                _context.Accounts.Update(user);
                await _context.SaveChangesAsync();
                return Ok("Update successful");
            }

            return BadRequest("user not found");
        }   


    }
}
