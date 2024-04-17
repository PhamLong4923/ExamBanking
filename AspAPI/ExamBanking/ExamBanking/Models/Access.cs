using System;
using System.Collections.Generic;

namespace ExamBanking.Models
{
    public partial class Access
    {
        public int Accessid { get; set; }
        public decimal? Fromid { get; set; }
        public decimal? Toid { get; set; }
        public int? Bankid { get; set; }
        public string? Message { get; set; }
        public int? Status { get; set; }

        public virtual Bank? Bank { get; set; }
        public virtual Account? From { get; set; }
        public virtual Account? To { get; set; }
    }
}
