using System;
using System.Collections.Generic;

namespace ExamBanking.Models
{
    public partial class Role
    {
        public Role()
        {
            Accounts = new HashSet<Account>();
        }

        public int Roleid { get; set; }
        public string? Role1 { get; set; }

        public virtual ICollection<Account> Accounts { get; set; }
    }
}
