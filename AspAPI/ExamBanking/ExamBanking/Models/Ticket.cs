using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ExamBanking.Models
{
    public partial class Ticket
    {
        public int Ticketid { get; set; }
        public int? Bankid { get; set; }
        public decimal? Accid { get; set; }
        public DateTime? Startdate { get; set; }
        public int? Expire { get; set; }
        public int? Ticketmode { get; set; }
        [JsonIgnore]
        public virtual Account? Acc { get; set; }
        public virtual Bank? Bank { get; set; }
    }
}
