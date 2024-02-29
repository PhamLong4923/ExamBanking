using System;
using System.Collections.Generic;

namespace ExamBanking.Models
{
    public partial class Account
    {
        public Account()
        {
            AccessFroms = new HashSet<Access>();
            AccessTos = new HashSet<Access>();
            Banks = new HashSet<Bank>();
            Payments = new HashSet<Payment>();
            Repositories = new HashSet<Repository>();
        }

        public int Accid { get; set; }
        public string? Email { get; set; }
        public byte[]? PasswordHash { get; set; }
        public byte[]? PasswordSalt { get; set; }
        public string? Accname { get; set; }
        public int? Accmode { get; set; }
        public string? VerificationToken { get; set; }
        public DateTime? Datejoin { get; set; }
        public string? PasswordResetToken { get; set; }
        public DateTime? ResetTokenExpires { get; set; }
        public int? Roleid { get; set; }

        public virtual Role? Role { get; set; }
        public virtual ICollection<Access> AccessFroms { get; set; }
        public virtual ICollection<Access> AccessTos { get; set; }
        public virtual ICollection<Bank> Banks { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }
        public virtual ICollection<Repository> Repositories { get; set; }
    }
}
