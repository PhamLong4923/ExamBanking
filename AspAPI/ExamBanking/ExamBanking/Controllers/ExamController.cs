using ExamBanking.Models;
using ExamBanking.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExamBanking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamController : ControllerBase
    {
        private readonly ExamBankingContext _context;


        public ExamController(ExamBankingContext context)
        {
            _context = context;
        }

        [HttpPost("CreateExam")]
        public IActionResult CreateExam(int section, int recognizeCount, int understandCount, int applyCount)
        {
            Random rnd = new Random();

            //cảm ơn chatgpt
            var selectedQuestions = new List<List<Question>>
            {
                GetRandomQuestions(section, 1, recognizeCount, rnd), 
                GetRandomQuestions(section, 2, understandCount, rnd), 
                GetRandomQuestions(section, 3, applyCount, rnd) 
            };

           
            return Ok(selectedQuestions);
        }

        
        private List<Question> GetRandomQuestions(int section, int modeId, int count, Random rnd)
        {
           
            var questions = _context.Questions
                .Where(x => x.Secid == section && x.Modeid == modeId)
                .ToList();

            
            var randomizedQuestions = questions.OrderBy(x => rnd.Next()).Take(count).ToList();

            return randomizedQuestions;
        }

    }
}
