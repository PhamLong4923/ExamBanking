using ExamBanking.DTO.QuestionDto;
using ExamBanking.Models;
using ExamBanking.Repositories;
using ExamBanking.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

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
                            .Include(q => q.Answers)
                            .Where(a => a.Secid == sectionid)
                            .ToList();

            // Convert each question to HTML format
            var htmlList = new List<object>();
            foreach (var question in listQuestion)
            {
                var htmlQuestion = new
                {
                    type = question.Type.ToString(),
                    content = $"<p>{question.Quescontent}</p>",
                    difficulty = question.Modeid.ToString(),
                    solution = $"<p>{question.Solution}</p>",
                    answers = question.Answers.Select(a => $"<p>{a.Anscontent}</p>").ToList()
                };
                htmlList.Add(htmlQuestion);
            }

           
            var json = JsonConvert.SerializeObject(htmlList, Formatting.Indented);

            return Ok(json);
        }
        //create question using rquestion
        [HttpPost("CreateQuestion")]
        public IActionResult CreateQuestion(CreateQuestionRequest question)
        {
            var questionid = _rquestion.CreateQuestion(question);
            return Ok(questionid);
        }
        
        [HttpPut("EditQuestion")]
        public IActionResult EditQuestion(int question)
        {
            _rquestion.EditQuestion(question);
            return Ok(question);
        }
        
        [HttpDelete("DeleteQuestion")]
        public IActionResult DeleteQuestion(int Quesid)
        {
           
            var question = _rquestion.DeleteQuestion(Quesid);
            return Ok(question);
        }

    }
}
