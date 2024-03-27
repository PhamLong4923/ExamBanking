using ExamBanking.DTO;
using ExamBanking.DTO.RepoDto;
using ExamBanking.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace ExamBanking.Repositories
{
    public class RRepositories
    {
        private readonly ExamBankingContext _context;
        private readonly RSection _rSection;
        public RRepositories(ExamBankingContext context,RSection rSection)
        {
            _context = context;
            _rSection = rSection;
        }

       public int createRepo(CreateRepoRequest request)
        {
            var repo = new Repo
            {
                Bankid = request.Bankid,
                Reponame = request.Repocontent,
                
            };
            _context.Repos.Add(repo);
            _context.SaveChanges();
            return repo.Repoid;
        }
        public void editRepo(int repoid, string newname)
        {
            var repo = _context.Repos.Find(repoid);
            if (repo == null)
            {
                return;
            }
            repo.Reponame = newname;
            _context.SaveChanges();
        }
        public int deleteRepo(int Repoid)
        {
            var repo = _context.Repos.Find(Repoid);
            
            _rSection.DeleteAllSection(Repoid);
            _context.Repos.Remove(repo);
            _context.SaveChanges();
            return Repoid;
        }
        public void DeleteAllRepo(int bankid)
        {
            var repos = _context.Repos.Where(a => a.Bankid == bankid).ToList();
            foreach (var repo in repos)
            {
                _rSection.DeleteAllSection(repo.Repoid);
                _context.Repos.Remove(repo);
            }
            _context.SaveChanges();
        }
    }
}
