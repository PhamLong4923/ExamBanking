using ExamBanking.DTO.AccountDto;
using ExamBanking.DTO.BankDto;
using ExamBanking.Models;
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
        public BankController(ExamBankingContext context)
        {
            _context = context;
        }
        [HttpPost("vquestions")]
        public IActionResult viewQuestionList()
        {
            //check user
            
            List<Question> qlist = eContext.Questions.ToList(); //take all for test
            

            return Ok(qlist);

        }

        [HttpPost("vsection")]
        public IActionResult viewSectionList()
        {
            //check user

            
            List<Section> sec = eContext.Sections.ToList(); //take all for test

            return Ok(sec);

        }
        [HttpPost("GetBank")]
        public IActionResult viewBankList()
        {
            var userid = 1; // sửa lại để lấy jwt token
            var listBank = _context.Banks.Where(a => a.Accid == userid).ToList();
            return Ok(listBank);
        }
        [HttpPost("CreateBank")]
        public async Task<IActionResult> CreateBank(CreateBankRequest request)
        {
            var userid = 1;
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
        [HttpPost("EditBank")]
        public async Task<IActionResult> EditBank(RenameBank request)
        {
            var userid = 1;
            var edit = _context.Banks.FirstOrDefault(a => a.Accid == userid && a.Bankid == request.Bankid);
            if(edit == null)
            {
                return BadRequest("not found");
            }
            edit.Bankname = request.Bankname;
            _context.SaveChangesAsync();
            return Ok("Edit Succes");
        }
        [HttpPost("DeleteBank")]
        public async Task<IActionResult> DeleteBank(DeleteBank request)
        {
            var userid = 1;
            
            var remove = _context.Banks.FirstOrDefault(a => a.Accid == userid && a.Bankid == request.Bankid);
            if (remove == null)
            {
                return BadRequest("Bank doesnt exist!!");
            }
            _context.Banks.Remove(remove);
            _context.SaveChangesAsync();
            return Ok("Delete Succes");
        }
    }
}
