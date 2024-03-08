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
            return list;
        }

        //// GET: api/Answers/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Answer>> GetAnswer(int id)
        //{
        //    var answer = await _context.Answers.FindAsync(id);

        //    if (answer == null)
        //    {
        //        return NotFound();
        //    }

        //    return answer;
        //}

        //// PUT: api/Answers/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutAnswer(int id, Answer answer)
        //{
        //    if (id != answer.Ansid)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(answer).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!AnswerExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}


        // edit answer
        [HttpPost("EditAnswer")]
        public async Task<IActionResult> EditAnswer(EditAnswerRequest request)
        {
            var answer = await _context.Answers.FirstOrDefaultAsync(a => a.Ansid == request.Answerid);
            if (answer == null)
            {
                return BadRequest("Answer not found");
            }
            answer.Anscontent = request.Content;
            answer.Ansstatus = request.Ansstatus;
            await _context.SaveChangesAsync();
            return Ok("Edit Succes");
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
            return answer;
        }

        

        // DELETE: api/Answers/5
        [HttpDelete("deleteAnswer")]
        public async Task<IActionResult> DeleteAnswer()
        {
            try
            {
                var userid = 1;
                var answerToRemove = _context.Answers.FirstOrDefault(a => a.Quesid == userid);

                if (answerToRemove == null)
                {
                    return NotFound(); // or any other appropriate status code
                }

                _context.Answers.Remove(answerToRemove);
                await _context.SaveChangesAsync();

                return Ok("delete succes");
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal server error");
            }
        }

        private bool AnswerExists(int id)
        {
            return _context.Answers.Any(e => e.Ansid == id);
        }
    }
}
