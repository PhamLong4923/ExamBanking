using System;
using System.Collections.Generic;

namespace ExamBanking.Models
{
    public partial class Account
    {
        public Account()
        {
            Banks = new HashSet<Bank>();
        }

        public int AccountId { get; set; }
        public string? Username { get; set; }
        public string? Userpass { get; set; }
        public string? Accname { get; set; }
        public string? Email { get; set; }
        public DateTime? DateJoin { get; set; }
        public int? RoleId { get; set; }

        public virtual Role? Role { get; set; }
        public virtual ICollection<Bank> Banks { get; set; }
    }
}
