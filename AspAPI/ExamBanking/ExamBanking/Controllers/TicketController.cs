using ExamBanking.DTO.TicketDto;
using ExamBanking.Models;
using ExamBanking.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ExamBanking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "User")]
    public class TicketController : ControllerBase
    {
        private readonly exambankingContext _context;
        public TicketController(exambankingContext context)
        {
            _context = context;
        }

        [HttpPost("createTicket")]
        public async Task<IActionResult> CreateTicket(CreateTicketRequest request)
        {
            var userId = Jwt.GetUserIdFromToken(Request.Headers["Authorization"]);
            var user = _context.Accounts.SingleOrDefault(u => u.Email == userId);

            DateTime Expire;
            if (user == null)
            {
                return Ok("User not found or token is invalid.");
            }
            var ticket = new Ticket
            {
                Bankid = request.Bankid,
                Accid = user.Accid,
                Expire = request.Expire ,
                Ticketmode = request.Ticketmode
            };
           
            return Ok(ticket);
        }
        [HttpDelete("deleteTicket")]
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
        [HttpGet("ListAll")]
        public async Task<IActionResult> findTickets()
        {
            var userId = Jwt.GetUserIdFromToken(Request.Headers["Authorization"]);
            var user = _context.Accounts.SingleOrDefault(u => u.Email == userId);
            if (user == null)
            {
                return Ok("User not found or token is invalid.");
            }
            var tickets = _context.Tickets.Where(t => t.Accid == user.Accid && t.Bankid == null).ToList();
            return Ok(tickets);
        }
        [HttpPut]
        public async Task<IActionResult> AproveTicket(int BankId,int ticketId)
        {
            var userId = Jwt.GetUserIdFromToken(Request.Headers["Authorization"]);
            var user = _context.Accounts.SingleOrDefault(u => u.Email == userId);
            if (user == null)
            {
                return Ok("User not found or token is invalid.");
            }
            var ticket = _context.Tickets.SingleOrDefault(t => t.Ticketid == ticketId);
            if (ticket == null)
            {
                return Ok("Ticket not found.");
            }
            if (ticket.Accid != user.Accid)
            {
                return Ok("You do not have permission to update this ticket.");
            }
            ticket.Startdate = DateTime.Now;
            ticket.Bankid = BankId;
            await _context.SaveChangesAsync();
            return Ok("Ticket updated.");
        }
    }
}
