using ExamBanking.DTO.BankDto;
using ExamBanking.Models;
using ExamBanking.Repositories;
using ExamBanking.Utils;
using Microsoft.AspNetCore.Authorization;

using Microsoft.AspNetCore.Mvc;

namespace ExamBanking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "User")]
    public class BankController : ControllerBase
    {
        
        private readonly exambankingContext _context;
        private readonly RRepositories _rRepositories;
        private readonly RAccount _rAccount;
    
        public BankController(exambankingContext context, RRepositories rRepositories, RAccount rAccount)
        {
            _context = context;
            _rRepositories = rRepositories;
            _rAccount = rAccount;          
        }


        [HttpGet("GetBank")]
        public IActionResult viewBankList()
        {
            var userId = Jwt.GetUserIdFromToken(Request.Headers["Authorization"]);

            // Sử dụng userId để truy vấn người dùng từ cơ sở dữ liệu
            var user = _context.Accounts.SingleOrDefault(u => u.Email == userId);

            if (user != null)
            {
                var listBank = _context.Banks.Where(a => a.Accid == user.Accid).ToList();

                return Ok(listBank);
            }
            else
            {
                return Ok("User not found or token is invalid.");
            }
        }



        [HttpPost("CreateBank")]
        public async Task<IActionResult> CreateBank(CreateBankRequest request)
        {
            var userId = Jwt.GetUserIdFromToken(Request.Headers["Authorization"]);

            var user = _context.Accounts.SingleOrDefault(u => u.Email == userId);

            if (_context.Banks.Any(b => b.Accid == user.Accid && b.Bankname == request.Bankname))
            {
                return BadRequest();
            }
            var bank = new Bank
            {
                Bankname = request.Bankname,
                Accid = user.Accid,
            };

            _context.Banks.Add(bank);
            await _context.SaveChangesAsync();
            return Ok(bank.Bankid);
        }
        [HttpPut("EditBank")]
        public async Task<IActionResult> EditBank(int bankid, string newname)
        {
            var userId = Jwt.GetUserIdFromToken(Request.Headers["Authorization"]);

            var user = _context.Accounts.SingleOrDefault(u => u.Email == userId);

            var edit = _context.Banks.FirstOrDefault(a => a.Accid == user.Accid && a.Bankid == bankid);
            if (edit == null)
            {
                return BadRequest();
            }
            edit.Bankname = newname;
            _context.SaveChangesAsync();
            return Ok(edit.Bankid);
        }
        [HttpPut("Update_bankMode")]
        public async Task<IActionResult> UpdateBankMode(int bankid, int mode)
        {
            var userId = Jwt.GetUserIdFromToken(Request.Headers["Authorization"]);

            var user = _context.Accounts.SingleOrDefault(u => u.Email == userId);

            var edit = _context.Banks.FirstOrDefault(a => a.Accid == user.Accid && a.Bankid == bankid);
            if (edit == null)
            {
                return BadRequest("dont exist");
            }
            edit.Bankmode = mode;
            _context.SaveChangesAsync();
            return Ok(edit.Bankid);
        }
        [HttpDelete("DeleteBank")]
        public async Task<IActionResult> DeleteBank(int bankid)
        {
            var userId = Jwt.GetUserIdFromToken(Request.Headers["Authorization"]);

            var user = _context.Accounts.SingleOrDefault(u => u.Email == userId);

            var remove = _context.Banks.FirstOrDefault(a => a.Accid == user.Accid && a.Bankid == bankid);
            if (remove == null)
            {
                return BadRequest();
            }
            _rRepositories.DeleteAllRepo(bankid);
            _context.Banks.Remove(remove);
            await _context.SaveChangesAsync();
            return Ok(remove.Bankid);
        }

       
    }
}
