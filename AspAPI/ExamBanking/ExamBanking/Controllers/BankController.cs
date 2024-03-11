using ExamBanking.DTO.AccountDto;
using ExamBanking.DTO.BankDto;
using ExamBanking.Models;
using ExamBanking.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExamBanking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BankController : ControllerBase
    {
        private ExamBankingContext eContext = new ExamBankingContext();
        private readonly ExamBankingContext _context;
        private readonly RRepositories _rRepositories;
        private readonly RAccount _rAccount;
        public BankController(ExamBankingContext context,RRepositories rRepositories,RAccount rAccount)
        {
            _context = context;
            _rRepositories = rRepositories;
            _rAccount = rAccount;
        }
        
        [HttpGet("GetBank")]
        public IActionResult viewBankList()
        {
            var userid = 2; // sửa lại để lấy jwt token
            var listBank = _context.Banks.Where(a => a.Accid == userid).ToList();
            return Ok(listBank);
        }
        [HttpPost("CreateBank")]
        public async Task<IActionResult> CreateBank(CreateBankRequest request)
        {
            var userid = 2;
            if (_context.Banks.Any(b => b.Accid == userid && b.Bankname == request.Bankname))
            {
                return BadRequest("Bank name already exists ");
            }
            var bank = new Bank
            {
                Bankname = request.Bankname,
                Bankstatus = request.Bankstatus,
                Accid = userid,
            };

            _context.Banks.Add(bank);
            await _context.SaveChangesAsync();
            return Ok("bank has benn created!!");
        }
        [HttpPut("EditBank")]
        public async Task<IActionResult> EditBank(RenameBank request)
        {
            var userid = 2;
            var edit = _context.Banks.FirstOrDefault(a => a.Accid == userid && a.Bankid == request.Bankid);
            if(edit == null)
            {
                return BadRequest("not found");
            }
            edit.Bankname = request.Bankname;
            _context.SaveChangesAsync();
            return Ok("Edit Succes");
        }
        [HttpDelete("DeleteBank")]
        public async Task<IActionResult> DeleteBank(DeleteBankRequest request)
        {
            var userid = 2;
            
            var remove = _context.Banks.FirstOrDefault(a => a.Accid == userid && a.Bankid == request.Bankid);
            if (remove == null)
            {
                return BadRequest("Bank doesnt exist!!");
            }
            _rRepositories.DeleteAllRepo(request.Bankid);
            _context.Banks.Remove(remove);
            _context.SaveChangesAsync();
            return Ok("Delete Succes");
        }
    }
}
