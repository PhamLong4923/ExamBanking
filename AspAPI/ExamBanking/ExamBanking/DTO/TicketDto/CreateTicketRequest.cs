namespace ExamBanking.DTO.TicketDto
{
    public class CreateTicketRequest
    {
        public int Ticketid { get; set; }
        public int? Bankid { get; set; }
        public decimal? Accid { get; set; }
        public int? Expire { get; set; }
        public int? Ticketmode { get; set; }
    }
}
