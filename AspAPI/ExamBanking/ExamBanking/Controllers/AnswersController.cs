using ExamBanking.DTO.AnswerDto;
using ExamBanking.Models;
using ExamBanking.Repositories;
using ExamBanking.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExamBanking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnswersController : ControllerBase
    {
        private readonly ExamBankingContext _context;
        private readonly RAnswer _ranswer;
        public AnswersController(ExamBankingContext context,RAnswer reanswer)
        {
            _context = context;
            _ranswer = reanswer;
        }

        // GET: api/Answers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Answer>>> GetAnswers(ListAnswerRequest request)
        {
           var list = await _ranswer.ListAnswers(request);
            return Ok(list);
        }

        

        // edit answer
        [HttpPost("EditAnswer")]
        public async Task<IActionResult> EditAnswer(int aid, string content)
        {
            var answer = await _context.Answers.FirstOrDefaultAsync(a => a.Ansid == aid);
            if (answer == null)
            {
                return BadRequest();
            }
            answer.Anscontent = content;
            answer.Ansstatus = 0;
            await _context.SaveChangesAsync();
            return Ok(answer.Ansid);
        }
        [HttpPost("CreateAnswer")]
        public async Task<ActionResult<Answer>> CreateAnswer(CreateAnswerRequest request)
        {
            var answer = new Answer
            {
                Quesid = request.Quesid,
                Anscontent = request.Content,
                Ansstatus = request.Ansstatus
            };
            _context.Answers.Add(answer);
            await _context.SaveChangesAsync();
            return Ok(answer.Ansid);
        }


        // delete answer using ranswer
        [HttpDelete("DeleteAnswer")]
        public async Task<ActionResult<Answer>> DeleteAnswer(int answerid)
        {
            var answer = await _ranswer.DeleteAnswer(answerid);
            if (answer == null)
            {
                return NotFound();
            }
            return Ok(answer.Ansid);
        }
        
        

        private bool AnswerExists(int id)
        {
            return _context.Answers.Any(e => e.Ansid == id);
        }
    }
}
