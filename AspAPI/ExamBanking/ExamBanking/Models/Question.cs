using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ExamBanking.Models
{
    public partial class Question
    {
        public Question()
        {
            Answers = new HashSet<Answer>();
        }

        public int Quesid { get; set; }
        public string? Quescontent { get; set; }
        public int? Type { get; set; }
        public string? Solution { get; set; }
        public int? Secid { get; set; }
        public int? Modeid { get; set; }
        public virtual Mode? Mode { get; set; }
        public virtual Section? Sec { get; set; }
        [JsonIgnore]
        public virtual ICollection<Answer> Answers { get; set; }
    }
}
