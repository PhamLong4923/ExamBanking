namespace ExamBanking.DTO.AnswerDto
{
    public class CreateAnswerRequest
    {
        public int Quesid { get; set; }
        public string Content { get; set; }
        public byte? Ansstatus { get; set; }
    }
}
