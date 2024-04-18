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

        // list het tat ca cac mode
        [HttpGet("ShowExam")]
        public IActionResult CreateExam([FromQuery] List<int> repoIds)
        {
            var selectedRepos = new List<object>();

            foreach (var repoId in repoIds)
            {
                var selectedSections = new List<object>();
                var repo = _context.Repos.FirstOrDefault(r => r.Repoid == repoId);

                if (repo == null)
                {
                    continue;
                }

                var sections = _context.Sections
                    .Where(s => s.Repoid == repoId) // Lọc các sec theo repoId
                    .GroupBy(s => s.Secid) // Nhóm các sec theo Secid
                    .Select(group => group.First()) // Chọn sec đầu tiên trong mỗi nhóm
                    .ToList();

                foreach (var sec in sections)
                {
                    var sectionObject = new
                    {
                        secid = sec.Secid,
                        secname = sec.Secname,
                        text = new List<object>(),
                        multi = new List<object>()
                    };

                    var allModes = _context.Modes.ToList();

                    foreach (var mode in allModes)
                    {
                        var questionCount = _context.Questions.Count(q => q.Secid == sec.Secid && q.Modeid == mode.Modeid);

                        var modeObject = new { modename = mode.Qmode, count = questionCount };

                        if (mode.Modeid <= 3)
                        {
                            sectionObject.multi.Add(modeObject);
                        }
                        else
                        {
                            sectionObject.text.Add(modeObject);
                        }
                    }

                    selectedSections.Add(sectionObject);
                }

                selectedRepos.Add(new
                {
                    repoid = repoId,
                    reponame = repo.Reponame,
                    secs = selectedSections
                });
            }

            return Ok(selectedRepos);
        }



        [HttpPost("CreateExam")]
        public IActionResult CreateExam([FromQuery] List<int> repoIds, int recognizeCount, int understandCount, int applyCount, int highAply, int easy, int medium, int hard, int advandce)
        {
            Random rnd = new Random();
            var selectedQuestions = new List<List<Question>>();

            foreach (var repoId in repoIds)
            {
                var repoQuestions = new List<Question>();

                // Get all sections for the current repo
                var sections = _context.Sections
                    .Where(s => s.Repoid == repoId)
                    .ToList();

                foreach (var sec in sections)
                {

                    var sectionQuestions = _context.Questions
                        .Where(q => q.Secid == sec.Secid)
                        .ToList();

                    repoQuestions.AddRange(sectionQuestions);
                }


                var recognizeQuestions = GetRandomQuestions(repoQuestions, 0, recognizeCount, rnd);
                var understandQuestions = GetRandomQuestions(repoQuestions, 1, understandCount, rnd);
                var applyQuestions = GetRandomQuestions(repoQuestions, 2, applyCount, rnd);
                var highApplyQuestions = GetRandomQuestions(repoQuestions, 3, highAply, rnd);
                var easyQuestions = GetRandomQuestions(repoQuestions, 4, easy, rnd);
                var mediumQuestions = GetRandomQuestions(repoQuestions, 5, medium, rnd);
                var hardQuestions = GetRandomQuestions(repoQuestions, 6, hard, rnd);
                var advanceQuestions = GetRandomQuestions(repoQuestions, 7, advandce, rnd);


                selectedQuestions.Add(recognizeQuestions);
                selectedQuestions.Add(understandQuestions);
                selectedQuestions.Add(applyQuestions);
            }

            return Ok(selectedQuestions);
        }


        private List<Question> GetRandomQuestions(List<Question> questions, int modeId, int count, Random rnd)
        {
            // Lọc câu hỏi theo modeId
            var filteredQuestions = questions.Where(q => q.Modeid == modeId).ToList();

            // Nếu số lượng câu hỏi cần lớn hơn số lượng câu hỏi có sẵn, chỉ lấy số lượng tối đa có thể
            count = Math.Min(count, filteredQuestions.Count);

            // Trộn câu hỏi và lấy số lượng câu hỏi cần
            var randomizedQuestions = filteredQuestions.OrderBy(x => rnd.Next()).Take(count).ToList();

            return randomizedQuestions;
        }


    }
}
