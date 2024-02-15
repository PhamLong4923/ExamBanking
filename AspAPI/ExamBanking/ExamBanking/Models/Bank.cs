using System;
using System.Collections.Generic;

namespace ExamBanking.Models
{
    public partial class Bank
    {
        public Bank()
        {
            Repositories = new HashSet<Repository>();
        }

        public int BankId { get; set; }
        public byte? BankStatus { get; set; }
        public int? AccountId { get; set; }

        public virtual Account? Account { get; set; }
        public virtual ICollection<Repository> Repositories { get; set; }
    }
}
