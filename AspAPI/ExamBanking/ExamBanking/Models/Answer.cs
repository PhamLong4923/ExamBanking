using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ExamBanking.Models
{
    public partial class Answer
    {
        public int Ansid { get; set; }
        public string? Anscontent { get; set; }
        public byte? Ansstatus { get; set; }
        public int? Quesid { get; set; }
        [JsonIgnore]
        public virtual Question? Ques { get; set; }
    }
}
