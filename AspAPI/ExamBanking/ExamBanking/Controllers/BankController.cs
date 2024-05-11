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
    
    public class BankController : ControllerBase
    {
        
        private readonly ExamBankingContext _context;
        private readonly RRepositories _rRepositories;
        private readonly RAccount _rAccount;
        private readonly RTicket _rTicket;
    
        public BankController(ExamBankingContext context, RRepositories rRepositories, RAccount rAccount,RTicket rTicket)
        {
            _context = context;
            _rRepositories = rRepositories;
            _rAccount = rAccount;    
            _rTicket = rTicket;
        }

        [Authorize(Roles = "User,Admin")]
        [HttpGet("GetBank")]
        public async Task<IActionResult> viewBankList()
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


        [Authorize(Roles = "User,Admin")]
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
        [Authorize(Roles = "User,Admin")]
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
        [Authorize(Roles = "User,Admin")]
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
            _rTicket.ReplaceAllTicketsNull(bankid);
            _rRepositories.DeleteAllRepo(bankid);
            _context.Banks.Remove(remove);
            await _context.SaveChangesAsync();
            return Ok(remove.Bankid);
        }

        //[Authorize(Roles = "User")]
        [HttpPost]
        public async Task<IActionResult> acceptAccessUser(int uid,int bankid)
        {
            var userId = Jwt.GetUserIdFromToken(Request.Headers["Authorization"]);
            var user = _context.Accounts.SingleOrDefault(u => u.Email == userId);
            var bank = _context.Banks.SingleOrDefault(b => b.Accid == user.Accid);
            if (user == null)
            {
                return Ok("User not found or token is invalid.");
            }
            var listBank = _context.Banks.Where(a => a.Bankmode == 1 && a.Accid == user.Accid).ToList();

            return Ok("Admin accept access user");
        }
       
    }
}
