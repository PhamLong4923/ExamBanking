using ExamBanking.DTO.QuestionDto;
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
    public class QuestionController : ControllerBase
    {
        private readonly ExamBankingContext _context;
        private readonly RQuestion _rquestion;
        public QuestionController(ExamBankingContext context, RQuestion rquestion)
        {
            _context = context;
            _rquestion = rquestion;
            
        }
        
        
        [HttpGet("listQuestion")]
        public IActionResult GetQuestion(int sectionid)
        {
            var listQuestion = _context.Questions
                        .Include(q => q.Answers) // Kết hợp thông tin câu trả lời
                        .Where(a => a.Secid == sectionid)
                        .ToList();

            return Ok(listQuestion);
        }
        //create question using rquestion
        [HttpPost("CreateQuestion")]
        public IActionResult CreateQuestion(CreateQuestionRequest question)
        {
            var questionid = _rquestion.CreateQuestion(question);
            return Ok(questionid);
        }
        
        [HttpPut("EditQuestion")]
        public IActionResult EditQuestion(EditQuestionRequest question)
        {
            _rquestion.EditQuestion(question);
            return Ok(question.Quesid);
        }
        
        [HttpDelete("DeleteQuestion")]
        public IActionResult DeleteQuestion(int Quesid)
        {
           
            var question = _rquestion.DeleteQuestion(Quesid);
            return Ok(question);
        }

    }
}
