using System;
using System.Collections.Generic;

namespace ExamBanking.Models
{
    public partial class Bank
    {
        public Bank()
        {
            Accesses = new HashSet<Access>();
            Repositories = new HashSet<Repository>();
        }

        public int Bankid { get; set; }
        public string? Bankname { get; set; }
        public byte? Bankstatus { get; set; }
        public int? Accid { get; set; }

        public virtual Account? Acc { get; set; }
        public virtual ICollection<Access> Accesses { get; set; }
        public virtual ICollection<Repository> Repositories { get; set; }
    }
}
