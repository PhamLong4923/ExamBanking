namespace ExamBanking.DTO.AnswerDto
{
    public class EditAnswerRequest
    {
        public int Answerid { get; set; }
        public int Quesid { get; set; }
        public string Content { get; set; }
        public byte? Ansstatus { get; set; }
    }
}
