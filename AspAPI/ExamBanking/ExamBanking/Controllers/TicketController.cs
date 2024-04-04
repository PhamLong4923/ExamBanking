using ExamBanking.DTO.TicketDto;
using ExamBanking.Models;
using ExamBanking.Utils;

using Microsoft.AspNetCore.Mvc;

namespace ExamBanking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly ExamBankingContext _context;
        public TicketController(ExamBankingContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateTicket(CreateTicketRequest request)
        {
            var userId = Jwt.GetUserIdFromToken(Request.Headers["Authorization"]);
            var user = _context.Accounts.SingleOrDefault(u => u.Email == userId);
            if (user == null)
            {
                return Ok("User not found or token is invalid.");
            }
            var ticket = new Ticket
            {
                Bankid = request.Bankid,
                Accid = user.Accid,
                Expire = request.Expire,
                Ticketmode = request.Ticketmode
            };
           
            return Ok(ticket);
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteTicket(DeleteTicketRequest request)
        {
            var userId = Jwt.GetUserIdFromToken(Request.Headers["Authorization"]);
            var user = _context.Accounts.SingleOrDefault(u => u.Email == userId);
            if (user == null)
            {
                return Ok("User not found or token is invalid.");
            }
            var ticket = _context.Tickets.SingleOrDefault(t => t.Ticketid == request.Ticketid);
            if (ticket == null)
            {
                return Ok("Ticket not found.");
            }
            if (ticket.Accid != user.Accid)
            {
                return Ok("You do not have permission to delete this ticket.");
            }
            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();
            return Ok("Ticket deleted.");
        }
        

    }
}
