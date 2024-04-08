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
        public IActionResult CreateExam(int repoId)
        {
            var selectedQuestions = new List<object>();

            // Tìm repo từ repoid trong cơ sở dữ liệu
            var repo = _context.Repos.FirstOrDefault(r => r.Repoid == repoId);

            if (repo == null)
            {
                // Trả về NotFound nếu không tìm thấy repo
                return NotFound($"Repo with ID '{repoId}' not found.");
            }

            var sections = _context.Sections.ToList(); // Lấy danh sách các section từ database

            foreach (var sec in sections)
            {
                var sectionObject = new
                {
                    secid = sec.Secid,
                    secname = sec.Secname,
                    count = new List<object>()
                };

                var modeCounts = new List<object>();

                // Lấy danh sách các modeid và tên mode tương ứng trong cơ sở dữ liệu
                var modes = _context.Questions
                                   .Where(q => q.Secid == sec.Secid)
                                   .Select(q => new { q.Modeid, q.Mode.Qmode })
                                   .Distinct()
                                   .ToList();

                foreach (var mode in modes)
                {
                    // Đếm số lượng câu hỏi cho từng modeid trong mỗi section
                    var questionCount = _context.Questions.Count(q => q.Secid == sec.Secid && q.Modeid == mode.Modeid);

                    modeCounts.Add(new { modename = mode.Qmode, count = questionCount });
                }

                sectionObject.count.Add(new { mcq = modeCounts });

                selectedQuestions.Add(sectionObject);
            }

            return Ok(new
            {
                repoid = repoId, // Sử dụng repoid từ yêu cầu HTTP
                reponame = repo.Reponame, // Sử dụng reponame từ repo được tìm thấy
                secs = selectedQuestions
            });
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
