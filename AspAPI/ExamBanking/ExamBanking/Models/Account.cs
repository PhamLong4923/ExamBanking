using System;
using System.Collections.Generic;

namespace ExamBanking.Models
{
    public partial class Account
    {
        public Account()
        {
            Banks = new HashSet<Bank>();
            Payments = new HashSet<Payment>();
            Repos = new HashSet<Repo>();
            Tickets = new HashSet<Ticket>();
        }

        public decimal Accid { get; set; }
        public string? Email { get; set; }
        public string? Userpass { get; set; }
        public string? Accname { get; set; }
        public int? Accmode { get; set; }
        public string? VerificationToken { get; set; }
        public DateTime? Datejoin { get; set; }
        public string? PasswordResetToken { get; set; }
        public DateTime? ResetTokenExpires { get; set; }
        public int? Roleid { get; set; }
        public int? Bankmode { get; set; }
        public int? Isnewbie { get; set; }
        public int? Ticketmode { get; set; }

        public virtual Role? Role { get; set; }
        public virtual ICollection<Bank> Banks { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }
        public virtual ICollection<Repo> Repos { get; set; }
        public virtual ICollection<Ticket> Tickets { get; set; }
    }
}
