using System;
using System.Collections.Generic;

namespace ExamBanking.Models
{
    public partial class Section
    {
        public Section()
        {
            Questions = new HashSet<Question>();
        }

        public int SectionId { get; set; }
        public string? SecTitle { get; set; }
        public int? RepoId { get; set; }
        public DateTime? SecDate { get; set; }

        public virtual Repository? Repo { get; set; }
        public virtual ICollection<Question> Questions { get; set; }
    }
}
