using System.ComponentModel.DataAnnotations;

namespace ExamBanking.DTO.BankDto
{
    public class CreateBankRequest
    {
        [Required]
        public string? Bankname { get; set; }
        public byte? Bankstatus { get; set; }
        public int? Accid { get; set; }
    }
}
