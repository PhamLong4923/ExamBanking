using System;
using System.Collections.Generic;

namespace ExamBanking.Models
{
    public partial class QuestionMode
    {
        public QuestionMode()
        {
            Questions = new HashSet<Question>();
        }

        public int QModeId { get; set; }
        public string? QTitle { get; set; }

        public virtual ICollection<Question> Questions { get; set; }
    }
}
