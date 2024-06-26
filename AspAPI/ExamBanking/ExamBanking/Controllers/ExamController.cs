﻿using ExamBanking.DTO.ExamDto;
using ExamBanking.Models;
using ExamBanking.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
                var allModes = _context.Modes.ToList(); // Execute immediately to close the DataReader

                if (repo == null)
                {
                    continue;
                }

                var sections = _context.Sections.Where(sc => sc.Repoid == repo.Repoid).ToList(); // Execute immediately

                foreach (var sec in sections)
                {
                    var sectionObject = new
                    {
                        secid = sec.Secid,
                        secname = sec.Secname,
                        text = new List<object>(),
                        multi = new List<object>()
                    };

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
        public IActionResult CreateExam(List<ExamQuestion> data)
        {
            List<Question> response = new List<Question>();

            foreach (var item in data)
            {
                response.AddRange(GetRandomQuestions(item.SectionId, item.Type, item.Mode, Int32.Parse(item.Count)));
            }

            return Ok(response);
        }


        private List<Question> GetRandomQuestions(int secid,int typeId, int modeId, int count)
        {
            // Lọc câu hỏi theo modeId

            var filteredQuestions = _context.Questions.Where(x => x.Secid == secid && x.Modeid == modeId && x.Type == typeId).Include(x => x.Answers).
                OrderByDescending(x => Guid.NewGuid()).Take(count).ToList();


            return filteredQuestions;
        }


    }
}