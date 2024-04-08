using System;
using System.Collections.Generic;

namespace ExamBanking.Models
{
    public partial class Ticket
    {
        public int Ticketid { get; set; }
        public int? Bankid { get; set; }
        public decimal? Accid { get; set; }
        public DateTime? Expire { get; set; }
        public int? Ticketmode { get; set; }

        public virtual Account? Acc { get; set; }
        public virtual Bank? Bank { get; set; }
    }
}
