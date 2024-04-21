using ExamBanking.Models;

namespace ExamBanking.DTO.TicketDto
{
    public class ResponseTIcket
    {
        public int Ticketid { get; set; }
        public string Ticketname { get; set; }
        public string? BankName { get; set; }
        public DateTime? StartDate { get; set; }
        public int? Expire { get; set; }
        public int? Ticketmode { get; set; }

        public ResponseTIcket()
        {
        }
    }
}
