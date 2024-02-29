using System;
using System.Collections.Generic;

namespace ExamBanking.Models
{
    public partial class Mode
    {
        public Mode()
        {
            Questions = new HashSet<Question>();
        }

        public int Modeid { get; set; }
        public string? Qmode { get; set; }

        public virtual ICollection<Question> Questions { get; set; }
    }
}
