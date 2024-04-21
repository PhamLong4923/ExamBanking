using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ExamBanking.Models
{
    public partial class Payment
    {
        public int Payid { get; set; }
        public decimal? Accid { get; set; }
        public DateTime? Paydate { get; set; }
        public string? Paycontent { get; set; }
        public int? Money { get; set; }
        public int? Status { get; set; }
        [JsonIgnore]
        public virtual Account? Acc { get; set; }
    }
}
