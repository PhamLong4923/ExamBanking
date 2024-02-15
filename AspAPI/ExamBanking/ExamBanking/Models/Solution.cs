using System;
using System.Collections.Generic;

namespace ExamBanking.Models
{
    public partial class Solution
    {
        public int SoluId { get; set; }
        public string? SoluContent { get; set; }
        public int? QuestionId { get; set; }

        public virtual Question? Question { get; set; }
    }
}
