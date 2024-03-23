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
        private readonly ExamBankingContext _context;
        private readonly RRepositories _rerepo;
        public RepositoriesController(ExamBankingContext context, RRepositories rerepo)
        {
            _context = context;
            _rerepo = rerepo;
        }

        
        [HttpPost("GetRepo")]
        public IActionResult GetRepo(ListRepoRequest request)
        {
            var list = _context.Repos.Where(a => a.Bankid == request.Bankid).ToList();
            return Ok(list);

        }

        [HttpPost("CreateRepo")]
        public IActionResult CreateRepo(CreateRepoRequest request)
        {
            var repoId = _rerepo.createRepo(request);
            return Ok(repoId);
        }

        [HttpPut("EditRepo")]
        public IActionResult EditRepo(EditRepoRequest request)
        {
            _rerepo.editRepo(request);
            return Ok(request.Repoid);
        }
        [HttpDelete("DelRepo")]
        public IActionResult DeleteRepo(int Repoid)
        {
            var repo = _rerepo.deleteRepo(Repoid);
            return Ok(repo);
        }
    }
}
