﻿using ExamBanking.Models;
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
