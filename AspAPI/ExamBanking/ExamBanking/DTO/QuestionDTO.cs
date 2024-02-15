using ExamBanking.Models;

namespace ExamBanking.DTO
{
    public class QuestionDTO
    {
        public QuestionDTO() { }
        public int QuestionID { get; set; }
        public string QuestionContent { get; set; }
        public List<string> AnswersList { get; set; }
        public string Solution { get; set; }

    }
}
