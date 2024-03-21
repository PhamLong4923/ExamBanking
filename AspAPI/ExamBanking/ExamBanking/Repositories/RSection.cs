using ExamBanking.DTO.SetionDto;
using ExamBanking.Models;

namespace ExamBanking.Repositories
{
    public class RSection
    {
        private readonly ExamBankingContext _context;
        private readonly RQuestion _rQuestion;
        private readonly RAnswer _rAnswer;

        public RSection(ExamBankingContext context,RQuestion rQuestion,RAnswer rAnswer)
        {
            _context = context;
            _rQuestion = rQuestion;
            _rAnswer = rAnswer;
        }

        public int CreateSection(CreateSectionRequest request)
        {
            var section = new Section
            {
                Secname = request.Secname,
                Repoid = request.Repoid
            };

            _context.Sections.Add(section);
            _context.SaveChanges();
            return section.Secid;
        }

        public void EditSection(EditSectionRequest request)
        {
            var section = _context.Sections.Find(request.Secid);
            if (section == null)
            {
                return;
            }
            section.Secname = request.Secname;
            _context.SaveChanges();
        }

        public void DeleteSection(DeleteSectionRequest request)
        {
            var section = _context.Sections.Find(request.Secid);
            
            if (section == null)
            {
                return;
            }
            _rQuestion.DeleteAllQuestion(request.Secid);
            _rAnswer.DeleteAllAnswer(request.Secid);
            _context.Sections.Remove(section);
            _context.SaveChanges();
        }
        public void DeleteAllSection(int repoid)
        {
            var sections = _context.Sections.Where(a => a.Repoid == repoid).ToList();
            foreach (var section in sections)
            {
                _rQuestion.DeleteAllQuestion(section.Secid);
                _rAnswer.DeleteAllAnswer(section.Secid);
                _context.Sections.Remove(section);
            }
            _context.SaveChanges();
        }
    }
}
