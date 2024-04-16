using ExamBanking.DTO.RepoDto;
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
        private readonly exambankingContext _context;
        private readonly RRepositories _rerepo;
        public RepositoriesController(exambankingContext context, RRepositories rerepo)
        {
            _context = context;
            _rerepo = rerepo;
        }

        
        [HttpGet("GetRepo")]
        public IActionResult GetRepo(int bankid)
        {
            var list = _context.Repos.Where(a => a.Bankid == bankid).ToList();
            return Ok(list);

        }

        [HttpPost("CreateRepo")]
        public IActionResult CreateRepo(CreateRepoRequest request)
        {
            var repoId = _rerepo.createRepo(request);
            return Ok(repoId);
        }

        [HttpPut("EditRepo")]
        public IActionResult EditRepo(int repoid, string newname)
        {
            _rerepo.editRepo(repoid, newname);
            return Ok(repoid);
        }
        [HttpDelete("DelRepo")]
        public IActionResult DeleteRepo(int Repoid)
        {
            var repo = _rerepo.deleteRepo(Repoid);
            return Ok(repo);
        }
    }
}
