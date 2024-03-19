using System;
using System.Collections.Generic;

namespace ExamBanking.Models
{
    public partial class Bank
    {
        public Bank()
        {
            Accesses = new HashSet<Access>();
            Repos = new HashSet<Repo>();
        }

        public int Bankid { get; set; }
        public string? Bankname { get; set; }
        public byte? Bankstatus { get; set; }
        public decimal? Accid { get; set; }

        public virtual Account? Acc { get; set; }
        public virtual ICollection<Access> Accesses { get; set; }
        public virtual ICollection<Repo> Repos { get; set; }
    }
}
