using System;
using System.Collections.Generic;

namespace ExamBanking.Models
{
    public partial class Answer
    {
        public int AnswerId { get; set; }
        public byte? AnswerStatus { get; set; }
        public int? AccountId { get; set; }
        public int? QuestionId { get; set; }

        public virtual Question? Question { get; set; }
    }
}
