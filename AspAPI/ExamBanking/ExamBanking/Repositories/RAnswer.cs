﻿using ExamBanking.DTO.AnswerDto;
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
        public async Task<Answer> DeleteAnswer(DeleteAnswerRequest request)
        {
            var answer = await _context.Answers.FindAsync(request.Answerid);
            if (answer == null)
            {
                return null;
            }
            _context.Answers.Remove(answer);
            await _context.SaveChangesAsync();
            return answer;
        }
    }
}