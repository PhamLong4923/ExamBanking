using System.ComponentModel.DataAnnotations;

namespace ExamBanking.DTO.BankDto
{
    public class DeleteBank
    {
        [Required]
        public int Bankid { get; set; }
    }
}
