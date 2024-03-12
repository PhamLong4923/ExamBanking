﻿using ExamBanking.DTO.RepoDto;
using ExamBanking.Models;
using ExamBanking.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExamBanking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RepositoriesController : ControllerBase
    {
        private readonly ExamBankingContext _context;
        private readonly RRepositories _rerepo;
        public RepositoriesController(ExamBankingContext context, RRepositories rerepo)
        {
            _context = context;
            _rerepo = rerepo;
        }

        
        [HttpPost]
        public IActionResult GetRepo(ListRepoRequest request)
        {
            var list = _context.Repos.Where(a => a.Bankid == request.Bankid).ToList();
            return Ok(list);

        }

        [HttpPost("CreateRepo")]
        public IActionResult CreateRepo(CreateRepoRequest request)
        {
            _rerepo.createRepo(request);
            return Ok("Create repo success");
        }

        [HttpPut("EditRepo")]
        public IActionResult EditRepo(EditRepoRequest request)
        {
            _rerepo.editRepo(request);
            return Ok("Edit repo success");
        }
        [HttpDelete]
        public IActionResult DeleteRepo(DeleteRepoRequest request)
        {
            _rerepo.deleteRepo(request);
            return Ok("Delete repo success");
        }
    }
}
