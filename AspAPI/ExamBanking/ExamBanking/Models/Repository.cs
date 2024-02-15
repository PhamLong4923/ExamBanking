using System;
using System.Collections.Generic;

namespace ExamBanking.Models
{
    public partial class Repository
    {
        public Repository()
        {
            Sections = new HashSet<Section>();
        }

        public int RepoId { get; set; }
        public string? RepoTitle { get; set; }
        public int? BankId { get; set; }
        public int? FrepoId { get; set; }

        public virtual Bank? Bank { get; set; }
        public virtual ICollection<Section> Sections { get; set; }
    }
}
