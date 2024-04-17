using ExamBanking.DTO;
using ExamBanking.DTO.AnswerDto;
using ExamBanking.DTO.QuestionDto;
using ExamBanking.Models;

namespace ExamBanking.Repositories
{
    public class RQuestion
    {
        private readonly exambankingContext _context;
        private readonly RAnswer _ranswer;
        public RQuestion(exambankingContext context, RAnswer ranswer)
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
        
        public int EditQuestion(int Quesid, string Quescontent)
        {
            var question = _context.Questions.Find(Quesid);

            if (question == null)
            {

                return -1;
            }         
            question.Quescontent = Quescontent;
            _context.SaveChanges();

            return Quesid;
        }

        public int EditSolution(int Quesid, string solution)
        {
            var question = _context.Questions.Find(Quesid);
            if (question == null)
            {
                return -1;
            }
            question.Solution = solution;
            _context.SaveChanges();
            return Quesid;
        }

        public int EditMode(int Quesid, int modeid)
        {
            var question = _context.Questions.Find(Quesid);
            if (question == null)
            {
                return -1;
            }
            question.Modeid = modeid;
            _context.SaveChanges();
            return Quesid;
        }


        //delete question and all answer which have quesid

        public int DeleteQuestion(int Quesid)
        {
            var question = _context.Questions.Find(Quesid);
            if (question != null)
            {
                _ranswer.DeleteAllAnswer(Quesid);
                _context.Questions.Remove(question);
                _context.SaveChanges();
            }
            return Quesid;
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
