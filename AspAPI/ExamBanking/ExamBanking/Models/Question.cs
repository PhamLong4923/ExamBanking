using System;
using System.Collections.Generic;

namespace ExamBanking.Models
{
    public partial class Question
    {
        public Question()
        {
            Answers = new HashSet<Answer>();
            Solutions = new HashSet<Solution>();
        }

        public int QuestionId { get; set; }
        public string? QQuestion { get; set; }
        public string? QType { get; set; }
        public string? QSolution { get; set; }
        public int? SectionId { get; set; }
        public int? QMode { get; set; }

        public virtual QuestionMode? QModeNavigation { get; set; }
        public virtual Section? Section { get; set; }
        public virtual ICollection<Answer> Answers { get; set; }
        public virtual ICollection<Solution> Solutions { get; set; }
    }
}
