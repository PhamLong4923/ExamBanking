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

                var sections = _context.Sections.ToList();

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

                        // Tạo modeObject dựa trên giá trị của modeid
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
        public IActionResult CreateExam([FromQuery] List<int> repoIds, int recognizeCount, int understandCount, int applyCount)
        {
            Random rnd = new Random();
            var selectedQuestions = new List<List<Question>>();

            foreach (var repoId in repoIds)
            {
                var repoQuestions = new List<Question>();

                // Lấy danh sách các câu hỏi từ repo
                var repoQuestion = _context.Questions
                    .Where(q => q.Sec.Repoid == repoId)
                    .ToList();

                // Lấy số lượng câu hỏi cho mỗi mức độ từ repo đã chọn
                var recognizeQuestions = GetRandomQuestions(repoQuestions, 1, recognizeCount, rnd);
                var understandQuestions = GetRandomQuestions(repoQuestions, 2, understandCount, rnd);
                var applyQuestions = GetRandomQuestions(repoQuestions, 3, applyCount, rnd);

                // Thêm các câu hỏi vào danh sách kết quả
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
