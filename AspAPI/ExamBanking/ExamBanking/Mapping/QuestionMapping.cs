using AutoMapper;
using ExamBanking.DTO;
using ExamBanking.Models;

namespace ExamBanking.Mapping
{
    public class QuestionMapping : Profile
    {
        public QuestionMapping()
        {
            CreateMap<Question, QuestionDTO>()
                .ForMember(dest => dest.QTitle, opt => opt.MapFrom(src => src.Mode.Qmode));
        }
    }
}
