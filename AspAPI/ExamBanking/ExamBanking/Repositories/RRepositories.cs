using ExamBanking.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace ExamBanking.Repositories
{
    public class RRepositories
    {
        private readonly ExamBankingContext _context;

        public RRepositories(ExamBankingContext context)
        {
            _context = context;
        }

        

        //public IEnumerable<DboRepository> GetRepositories()
        //{
        //    return _context.Repositories.ToList();
        //}
    }
}
