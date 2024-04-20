using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ExamBanking.Models
{
    public partial class Bank
    {
        public Bank()
        {
            Accesses = new HashSet<Access>();
            Repos = new HashSet<Repo>();
            Tickets = new HashSet<Ticket>();
        }

        public int Bankid { get; set; }
        public string? Bankname { get; set; }
        public byte? Bankstatus { get; set; }
        public decimal? Accid { get; set; }
        public int? Bankmode { get; set; }
        [JsonIgnore]
        public virtual Account? Acc { get; set; }
        public virtual ICollection<Access> Accesses { get; set; }
        public virtual ICollection<Repo> Repos { get; set; }
        public virtual ICollection<Ticket> Tickets { get; set; }
    }
}
