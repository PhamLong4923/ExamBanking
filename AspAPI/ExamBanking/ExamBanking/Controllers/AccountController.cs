using ExamBanking.Models;
using ExamBanking.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        [Authorize(Roles = "User")]
        [HttpGet("getBankMode")]
        public async Task<IActionResult> getBankMode()
        {
            var userId = Jwt.GetUserIdFromToken(Request.Headers["Authorization"]);

            // Sử dụng userId để truy vấn người dùng từ cơ sở dữ liệu
            var user = _context.Accounts.SingleOrDefault(u => u.Email == userId);
            if (user != null)
            {
 
                return Ok(user.Bankmode);
            }

            return BadRequest("user not found");
        }

        [HttpPut("Update_bankMode")]
        public async Task<IActionResult> UpdateBankMode(int bankid, int mode)
        {
            var userId = Jwt.GetUserIdFromToken(Request.Headers["Authorization"]);

            var user = _context.Accounts.SingleOrDefault(u => u.Email == userId);

            var edit = _context.Accounts.FirstOrDefault(a => a.Accid == user.Accid);
            if (edit == null)
            {
                return BadRequest("dont exist");
            }
            edit.Bankmode = mode;
            _context.SaveChangesAsync();
            return Ok(edit.Bankmode);
        }

        [HttpPost("manager_user")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> manager_user(int accid)
        {
           var user = _context.Accounts.SingleOrDefault(u => u.Accid == accid);

            if (user == null)
            {
                return Ok("user not found.");
            }
            if (user.Accmode == 0)
            {
                user.Accmode = 1;
            }
            else
            {
                user.Accmode = 0;
            }
            _context.SaveChangesAsync();
            return Ok(user.Accid);

            
        }

    }
}
