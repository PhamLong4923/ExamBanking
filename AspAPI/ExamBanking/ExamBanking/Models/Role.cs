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

        public int RoleId { get; set; }
        public string? RoleTitle { get; set; }

        public virtual ICollection<Account> Accounts { get; set; }
    }
}
