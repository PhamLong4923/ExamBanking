using ExamBanking.DTO.TicketDto;
using ExamBanking.Models;
using ExamBanking.Utils;

namespace ExamBanking.Repositories
{
    public class RTicket
    {
        private readonly exambankingContext _context;
        public RTicket(exambankingContext context)
        {
            _context = context;
        }

        
    }
}
