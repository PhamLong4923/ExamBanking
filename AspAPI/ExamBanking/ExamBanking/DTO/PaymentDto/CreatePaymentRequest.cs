namespace ExamBanking.DTO.PaymentDto
{
    public class CreatePaymentRequest
    {
       
        public DateTime? Paydate { get; set; }
        public string? Paycontent { get; set; }
        public int? Money { get; set; }
        public int? Status { get; set; }
       
    }
}
