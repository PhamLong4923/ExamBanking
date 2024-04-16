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
        private readonly exambankingContext _context;
        private readonly RQuestion _rquestion;
        public QuestionController(exambankingContext context, RQuestion rquestion)
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

            var questionOutputList = new List<listQuestionDto>();
            foreach (var question in listQuestion)
            {
                var answers = question.Answers.Select(a => new AnswerOutput
                {
                    ansid = a.Ansid,
                    anscontent = a.Anscontent
                }).ToList();

                var questionOutput = new listQuestionDto
                {
                    quesid = question.Quesid,
                    quescontent = question.Quescontent,
                    answers = answers,
                    solution = question.Solution,
                    type = question.Type,
                    modeid = question.Modeid
                };
                questionOutputList.Add(questionOutput);
            }

            return Ok(questionOutputList);
        }

        //create question using rquestion
        [HttpPost("CreateQuestion")]
        public IActionResult CreateQuestion(CreateQuestionRequest question)
        {
            var questionid = _rquestion.CreateQuestion(question);
            return Ok(questionid);
        }

        [HttpPut("EditQuestion")]
        public IActionResult EditQuestion(int question, string Quescontent, int type, string solution, int modeid)
        {
            _rquestion.EditQuestion(question, Quescontent, type);
            return Ok(question);
        }

        [HttpPut("EditSolution")]
        public IActionResult EditSolution(int question, string solution)
        {
            _rquestion.EditSolution(question, solution);
            return Ok(question);
        }
        [HttpPut]
        public IActionResult EditMode(int question, int modeid)
        {
            _rquestion.EditMode(question, modeid);
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
