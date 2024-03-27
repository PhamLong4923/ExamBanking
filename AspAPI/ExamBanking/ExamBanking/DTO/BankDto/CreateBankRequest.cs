using System.ComponentModel.DataAnnotations;

namespace ExamBanking.DTO.BankDto
{
    public class CreateBankRequest
    {
        [Required]
        public string? Bankname { get; set; }

        
    }
}
