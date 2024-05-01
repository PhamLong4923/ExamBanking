using ExamBanking.DTO.TicketDto;
using ExamBanking.Models;
using ExamBanking.Utils;

namespace ExamBanking.Repositories
{
    public class RTicket
    {
        private readonly ExamBankingContext _context;
        public RTicket(ExamBankingContext context)
        {
            _context = context;
        }
        public int CountTime(int ticketId, int days)
        {
            var ticket = _context.Tickets.SingleOrDefault(t => t.Ticketid == ticketId);
            if (ticket == null)
            {
                return 0;
            }

            // Kiểm tra và chuyển đổi Startdate sang DateTime nếu cần
            if (!(ticket.Startdate is DateTime))
            {
                // Xử lý trường hợp khi Startdate không phải là DateTime
                return 0; // hoặc thực hiện xử lý phù hợp
            }

            // Tạo một đối tượng DateTime mới bằng cách thêm số ngày vào Startdate
            DateTime expireDate = ((DateTime)ticket.Startdate).AddDays(days);

            // Tính số ngày còn lại
            int remainDays = (expireDate - DateTime.Now).Days;

            return remainDays;
        }

        // delete all tickets which have banbkid = bankid
        public void DeleteAllTickets(int bankId)
        {
            var tickets = _context.Tickets.Where(t => t.Bankid == bankId).ToList();
            _context.Tickets.RemoveRange(tickets);
            _context.SaveChanges();
        }
    }
}
