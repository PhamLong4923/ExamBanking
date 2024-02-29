using System;
using System.Collections.Generic;

namespace ExamBanking.Models
{
    public partial class Payment
    {
        public int Payid { get; set; }
        public int? Accid { get; set; }
        public DateTime? Paydate { get; set; }
        public int? Paymode { get; set; }
        public int? Money { get; set; }

        public virtual Account? Acc { get; set; }
    }
}
