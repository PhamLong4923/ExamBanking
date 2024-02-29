using System;
using System.Collections.Generic;

namespace ExamBanking.Models
{
    public partial class Repository
    {
        public Repository()
        {
            Accesses = new HashSet<Access>();
            Sections = new HashSet<Section>();
        }

        public int Repoid { get; set; }
        public string? Reponame { get; set; }
        public int? Secondeditor { get; set; }
        public int? Bankid { get; set; }

        public virtual Bank? Bank { get; set; }
        public virtual Account? SecondeditorNavigation { get; set; }
        public virtual ICollection<Access> Accesses { get; set; }
        public virtual ICollection<Section> Sections { get; set; }
    }
}
