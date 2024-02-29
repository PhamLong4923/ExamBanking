//using ExamBanking.Models;
//using Microsoft.EntityFrameworkCore;

//namespace ExamBanking.Repository
//{

//    public class RExample
//    {
//        private readonly ExamBankingContext _context;

//        public RExample(ExamBankingContext context)
//        {
//            _context = context;
//        }

//        public Question GetQuestions()
//        {
//            return _context.Questions.Where(q => q.QuestionId == 1).FirstOrDefault();
//        }

//        public IEnumerable<Question> GetQuestionsWithModeNavigation()
//        {
//            return _context.Questions.Include(q => q.QModeNavigation).ToList();
//        }
//    }
//}
