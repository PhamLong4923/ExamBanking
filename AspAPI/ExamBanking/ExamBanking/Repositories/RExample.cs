using ExamBanking.Models;
using Microsoft.EntityFrameworkCore;

namespace ExamBanking.Repository
{

    public class RExample
    {
        private readonly exambankingContext _context;

        public RExample(exambankingContext context)
        {
            _context = context;
        }

        public Question GetQuestions()
        {
            return _context.Questions.Where(q => q.Quesid == 1).FirstOrDefault();
        }

        public IEnumerable<Question> GetQuestionsWithModeNavigation()
        {
            return _context.Questions.Include(q => q.Modeid).ToList();
        }
    }
}
