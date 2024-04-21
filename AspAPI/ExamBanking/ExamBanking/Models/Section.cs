using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ExamBanking.Models
{
    public partial class Section
    {
        public Section()
        {
            Questions = new HashSet<Question>();
        }

        public int Secid { get; set; }
        public string? Secname { get; set; }
        public int? Repoid { get; set; }

        public virtual Repo? Repo { get; set; }
        [JsonIgnore]
        public virtual ICollection<Question> Questions { get; set; }
    }
}
