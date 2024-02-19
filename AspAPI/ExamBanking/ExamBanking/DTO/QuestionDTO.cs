using ExamBanking.Models;

namespace ExamBanking.DTO
{
    public class QuestionDTO
    {
        public int? QuestionId { get; set; }
        public string? QQuestion { get; set; }
        public string? QType { get; set; }
        public string? QSolution { get; set; }
        public string? QTitle { get; set; }

    }
}
