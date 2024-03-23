using ExamBanking.DTO;
using ExamBanking.DTO.AnswerDto;
using ExamBanking.DTO.QuestionDto;
using ExamBanking.Models;

namespace ExamBanking.Repositories
{
    public class RQuestion
    {
        private readonly ExamBankingContext _context;
        private readonly RAnswer _ranswer;
        public RQuestion(ExamBankingContext context, RAnswer ranswer)
        {
            _context = context;
            _ranswer = ranswer;
        }
        // create question
        public int CreateQuestion(CreateQuestionRequest request)
        {

            Question question = new Question
            {
                Quescontent = request.Quescontent,
                Type = request.Type,
                Solution = request.Solution,
                Secid = request.Secid,
                Modeid = request.Modeid
            };
            _context.Questions.Add(question);
            _context.SaveChanges();
            return question.Quesid;
        }
        //edit question
        public void EditQuestion(EditQuestionRequest request)
        {
            var question = _context.Questions.Find(request.Quesid);
            if (question != null)
            {
                question.Quescontent = request.Quescontent;
                question.Type = request.Type;
                question.Solution = request.Solution;
                question.Secid = request.Secid;
                question.Modeid = request.Modeid;
                _context.SaveChanges();
            }
        }
        //delete question and all answer which have quesid
        
        public void DeleteQuestion(DeleteQuestionRequest request)
        {
            var question = _context.Questions.Find(request.Quesid);
            if (question != null)
            {
                _ranswer.DeleteAllAnswer(request.Quesid);
                _context.Questions.Remove(question);
                _context.SaveChanges();
            }
        }
        public void DeleteAllQuestion(int Secid)
        {
            var list = _context.Questions.Where(a => a.Secid == Secid).ToList();
            foreach (var question in list)
            {
                _ranswer.DeleteAllAnswer(question.Quesid);
                _context.Questions.Remove(question);
            }
            _context.SaveChanges();
        }
    }
}
