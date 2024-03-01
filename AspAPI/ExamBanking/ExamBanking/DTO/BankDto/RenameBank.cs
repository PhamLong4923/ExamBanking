using System.ComponentModel.DataAnnotations;

namespace ExamBanking.DTO.BankDto
{
    public class RenameBank
    {
        [Required]
        public int Bankid { get; set; }
        [Required]
        public string? Bankname { get; set; }
    }
}
