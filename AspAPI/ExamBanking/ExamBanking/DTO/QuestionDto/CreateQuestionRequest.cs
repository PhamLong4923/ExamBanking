namespace ExamBanking.DTO.QuestionDto
{
    public class CreateQuestionRequest
    {
        public int Quesid { get; set; }
        public string? Quescontent { get; set; }
        public int? Type { get; set; }
        public string? Solution { get; set; }
        public int? Secid { get; set; }
        public int? Modeid { get; set; }
    }
}
