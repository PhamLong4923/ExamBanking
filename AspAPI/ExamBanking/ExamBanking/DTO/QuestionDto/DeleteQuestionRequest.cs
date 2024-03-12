using System.ComponentModel.DataAnnotations;

namespace ExamBanking.DTO.QuestionDto
{
    public class DeleteQuestionRequest
    {
        [Required]
        public int Quesid { get; set; }
        public int? Secid { get; set; }
        public int? Modeid { get; set; }
    }
}
