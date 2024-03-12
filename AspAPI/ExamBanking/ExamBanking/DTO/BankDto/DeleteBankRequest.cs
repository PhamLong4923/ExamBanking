using System.ComponentModel.DataAnnotations;

namespace ExamBanking.DTO.BankDto
{
    public class DeleteBankRequest
    {
        [Required]
        public int Bankid { get; set; }
    }
}
