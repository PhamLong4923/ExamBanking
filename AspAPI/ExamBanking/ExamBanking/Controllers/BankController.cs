using ExamBanking.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExamBanking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BankController : ControllerBase
    {
        private ExamBankingContext eContext = new ExamBankingContext();

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
    }
}
