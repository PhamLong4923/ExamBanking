namespace ExamBanking.DTO.QuestionDto
{
    public class CreateQuestionRequest
    {
       
        public string? Quescontent { get; set; }
        public int? Type { get; set; }
        public string? Solution { get; set; }
        public int? Secid { get; set; }
        public int? Modeid { get; set; }
        public List<String> Answers { get; set; }
    }
}
