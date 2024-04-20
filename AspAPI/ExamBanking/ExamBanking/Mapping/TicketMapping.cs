using AutoMapper;
using ExamBanking.DTO.TicketDto;
using ExamBanking.Models;

public class TicketMapping : Profile
{
    public TicketMapping()
    {
        CreateMap<Ticket, ResponseTIcket>()
            .ForMember(dest => dest.BankName, opt => opt.MapFrom(src => GetBankName(src.Bankid)));
    }

    private static string GetBankName(int? bankId)
    {
        if (bankId != null)
        {
            using (var context = new ExamBankingContext())
            {
                var bank = context.Banks.SingleOrDefault(b => b.Bankid == bankId);
                return bank != null ? bank.Bankname : "";
            }
        }
        return "";
    }
}
