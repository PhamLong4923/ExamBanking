using ExamBanking.Models;
using ExamBanking.Utils;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Http;
namespace ExamBanking.Repositories
{
    public class RAccount
    {
        private readonly ExamBankingContext _context;
        public RAccount(ExamBankingContext context)
        {
            _context = context;
        }

        
    }
}
