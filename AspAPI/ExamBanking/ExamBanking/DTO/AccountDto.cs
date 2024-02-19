using ExamBanking.Models;

namespace ExamBanking.DTO
{
    public class AccountDto
    {
        public int AccountId { get; set; }
        public string? Username { get; set; }
        public string? Userpass { get; set; }
        public string? Accname { get; set; }
        public string? Email { get; set; }
        public DateTime? DateJoin { get; set; }
        public int? RoleId { get; set; }

    }
}
