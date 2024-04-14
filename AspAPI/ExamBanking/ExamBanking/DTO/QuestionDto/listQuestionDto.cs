namespace ExamBanking.DTO.QuestionDto
{
    public class listQuestionDto
    {
        public int quesid { get; set; }
        public string? quescontent { get; set; }
        public List<AnswerOutput>? answers { get; set; }
        public string? solution { get; set; }
        public int? type { get; set; }
        public int? modeid { get; set; }
    }
}
