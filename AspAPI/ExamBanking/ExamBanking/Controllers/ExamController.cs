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

        [HttpGet("ShowExam")]
        public IActionResult CreateExam([FromQuery] List<int> repoIds)
        {
            var selectedRepos = new List<object>();

            foreach (var repoId in repoIds)
            {
                var selectedQuestions = new List<object>();

                // Tìm repo từ repoid trong cơ sở dữ liệu
                var repo = _context.Repos.FirstOrDefault(r => r.Repoid == repoId);

                if (repo == null)
                {
                    // Bỏ qua repo không tìm thấy và tiếp tục vòng lặp
                    continue;
                }

                var sections = _context.Sections.ToList(); // Lấy danh sách các section từ database

                foreach (var sec in sections)
                {
                    var sectionObject = new
                    {
                        secid = sec.Secid,
                        secname = sec.Secname,
                        level = new List<object>()
                    };

                    var modeCountsType1 = new List<object>();
                    var modeCountsType2 = new List<object>();

                    // Đếm số lượng câu hỏi cho từng modeid của type 1 trong mỗi section
                    var modesType1 = _context.Questions
                                        .Where(q => q.Secid == sec.Secid && q.Type == 1)
                                        .Select(q => new { q.Modeid, q.Mode.Qmode })
                                        .Distinct()
                                        .ToList();

                    foreach (var mode in modesType1)
                    {
                        var questionCount = _context.Questions.Count(q => q.Secid == sec.Secid && q.Modeid == mode.Modeid);
                        modeCountsType1.Add(new { modename = mode.Qmode, count = questionCount });
                    }

                    // Đếm số lượng câu hỏi cho từng modeid của type 2 trong mỗi section
                    var modesType2 = _context.Questions
                                        .Where(q => q.Secid == sec.Secid && q.Type == 2)
                                        .Select(q => new { q.Modeid, q.Mode.Qmode })
                                        .Distinct()
                                        .ToList();

                    foreach (var mode in modesType2)
                    {
                        var questionCount = _context.Questions.Count(q => q.Secid == sec.Secid && q.Modeid == mode.Modeid);
                        modeCountsType2.Add(new { modename = mode.Qmode, count = questionCount });
                    }

                    sectionObject.level.Add(new { multi = modeCountsType1 });
                    sectionObject.level.Add(new { text = modeCountsType2 });

                    selectedQuestions.Add(sectionObject);
                }

                // Thêm thông tin của repo và các câu hỏi đã chọn vào danh sách kết quả
                selectedRepos.Add(new
                {
                    repoid = repoId,
                    reponame = repo.Reponame,
                    secs = selectedQuestions
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
