using ExamBanking.DTO.ExamDto;
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
                if(selectedSections.Count > 0)
                {
                    selectedRepos.Add(new
                    {
                        repoid = repoId,
                        reponame = repo.Reponame,
                        secs = selectedSections
                    });
                }
                
            }

            return Ok(selectedRepos);
        }



        [HttpPost("CreateExam")]
        public IActionResult CreateExam([FromQuery] List<int> repoIds, int recognizeCount, int understandCount, int applyCount, int highAply, int easy, int medium, int hard, int advandce)
        {
            Random rnd = new Random();
            var selectedQuestions = new List<ExamQuestion>();

            foreach (var repoId in repoIds)
            {
                // Lấy danh sách các câu hỏi từ repo
                var repoQuestions = _context.Questions
                    .Where(q => q.Sec.Repoid == repoId)
                    .ToList();

                // Lấy số lượng câu hỏi cho mỗi mức độ từ repo đã chọn
                var recognizeQuestions = GetRandomQuestions(repoQuestions, 1, recognizeCount, rnd);
                var understandQuestions = GetRandomQuestions(repoQuestions, 2, understandCount, rnd);
                var applyQuestions = GetRandomQuestions(repoQuestions, 3, applyCount, rnd);

                // Thêm các câu hỏi vào danh sách kết quả
                selectedQuestions.AddRange(CreateExamQuestions(recognizeQuestions, 1, 1));
                selectedQuestions.AddRange(CreateExamQuestions(understandQuestions, 1, 0));
                selectedQuestions.AddRange(CreateExamQuestions(applyQuestions, 1, 6));
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
        private List<ExamQuestion> CreateExamQuestions(List<Question> questions, int sectionId, int mode)
        {
            var examQuestions = new List<ExamQuestion>();
            var groupedQuestions = questions.GroupBy(q => q.Modeid);

            foreach (var group in groupedQuestions)
            {
                var count = group.Count();
                if (count > 0)
                {
                    var examQuestion = new ExamQuestion
                    {
                        SectionId = sectionId,
                        Type = 0, // Type is not specified in your desired output, so I've set it to 0.
                        Mode = mode,
                        Count = count
                    };
                    examQuestions.Add(examQuestion);
                }
            }

            return examQuestions;
        }


    }
}


