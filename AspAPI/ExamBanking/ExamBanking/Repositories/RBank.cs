using ExamBanking.DTO.BankDto;
using ExamBanking.Models;
using System.Threading.Tasks;
namespace ExamBanking.Repositories
{
    public class RBank
    {
        private readonly exambankingContext _context;

        public RBank(exambankingContext context)
        {
            _context = context;
        }

        public async Task<Bank> CreateBankAsync(CreateBankRequest request)
        {
            var bank = new Bank
            {
                Bankname = request.Bankname,
            };

            _context.Banks.Add(bank);
            await _context.SaveChangesAsync();

            return bank;
        }
    }
}
