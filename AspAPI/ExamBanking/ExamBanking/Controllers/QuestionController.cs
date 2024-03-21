using ExamBanking.DTO.QuestionDto;
using ExamBanking.Models;
using ExamBanking.Repositories;
using ExamBanking.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
            var listQuestion = _context.Questions.Where(a => a.Secid == sectionid).ToList();
            return Ok(listQuestion);
        }
        //create question using rquestion
        [HttpPost("CreateQuestion")]
        public IActionResult CreateQuestion(CreateQuestionRequest question)
        {
            _rquestion.CreateQuestion(question);
            return Ok(question.Quesid);
        }
        
        [HttpPut("EditQuestion")]
        public IActionResult EditQuestion(EditQuestionRequest question)
        {
            _rquestion.EditQuestion(question);
            return Ok(question.Quesid);
        }
        
        [HttpDelete("DeleteQuestion")]
        public IActionResult DeleteQuestion(DeleteQuestionRequest question)
        {
           
            _rquestion.DeleteQuestion(question);
            return Ok(question.Quesid);
        }

    }
}
