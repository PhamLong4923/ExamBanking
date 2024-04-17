using ExamBanking.DTO.AnswerDto;
using ExamBanking.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExamBanking.Repositories
{
    public class RAnswer
    {
        private readonly ExamBankingContext _context;

        public RAnswer(ExamBankingContext context)
        {
            _context = context;
        }

       public async Task<ActionResult<IEnumerable<Answer>>> ListAnswers(ListAnswerRequest request)
        {
            var list = await _context.Answers
                                       .Where(a => a.Quesid == request.Quesid)
                                       .ToListAsync();

            return list;
        }
        public async Task<Answer> DeleteAnswer(int Answerid)
        {
            var answer = await _context.Answers.FindAsync(Answerid);
            if (answer == null)
            {
                return null;
            }
            _context.Answers.Remove(answer);
            await _context.SaveChangesAsync();
            return answer;
        }

        //delete all answer which have quesid using void
        public void DeleteAllAnswer(int Quesid)
        {
            var list = _context.Answers.Where(a => a.Quesid ==Quesid).ToList();
            foreach (var answer in list)
            {
                _context.Answers.Remove(answer);
            }
            _context.SaveChanges();
        }
        
        
    }
}
