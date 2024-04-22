using ExamBanking.DTO.TicketDto;
using ExamBanking.Models;
using ExamBanking.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ExamBanking.Utils;
using AutoMapper;
using ExamBanking.Repositories;

namespace ExamBanking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "User,Admin")]
    public class TicketController : ControllerBase
    {
        private readonly ExamBankingContext _context;
        private readonly IMapper _mapper;
        public TicketController(ExamBankingContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet("kitnewbie")]
        public async Task<IActionResult> kitNewBie()
        {
            var userId = Jwt.GetUserIdFromToken(Request.Headers["Authorization"]);
            var user = _context.Accounts.FirstOrDefault(u => u.Email == userId);
            if (user.Isnewbie == 1)
            {

                Ticket tk1 = new Ticket { Expire = 90, Ticketmode = 1, Accid = user.Accid, Ticketname = TicketNameGen.GenTicketNameFunc(userId, "ps") };
                Ticket tk2 = new Ticket { Expire = 90, Ticketmode = 2, Accid = user.Accid, Ticketname = TicketNameGen.GenTicketNameFunc(userId, "st") };

                _context.Tickets.Add(tk1);
                _context.Tickets.Add(tk2);
                _context.SaveChanges();

                var responseTickets = _mapper.Map<List<ResponseTIcket>>(new List<Ticket>{tk1, tk2});

                return Ok(responseTickets);
            }

            return Ok("Not new user");

        }

        [HttpPost("createTicket")]
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
                Ticketname = TicketNameGen.GenTicketNameFunc(user.Email, request.Ticketmode==1?"ps":"tk"),
                Bankid = request.Bankid,
                Accid = user.Accid,
                Expire = request.Expire,
                Ticketmode = request.Ticketmode
            };

            _context.Tickets.Add(ticket);
            _context.SaveChanges();

            return Ok(ticket);
        }
        [HttpDelete("deleteTicket")]
        public async Task<IActionResult> DeleteTicket(int tkid)
        {
            var userId = Jwt.GetUserIdFromToken(Request.Headers["Authorization"]);
            var user = _context.Accounts.SingleOrDefault(u => u.Email == userId);
            if (user == null)
            {
                return Ok("User not found or token is invalid.");
            }
            var ticket = _context.Tickets.SingleOrDefault(t => t.Ticketid == tkid);
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
        [HttpGet("listaviableticket")]
        public async Task<IActionResult> findTickets(int ticketmode)
        {
            var userId = Jwt.GetUserIdFromToken(Request.Headers["Authorization"]);
            var user = _context.Accounts.SingleOrDefault(u => u.Email == userId);
            if (user == null)
            {
                return Ok("User not found or token is invalid.");
            }
            var tickets = _context.Tickets.Where(t => t.Accid == user.Accid && t.Bankid == null && t.Ticketmode == ticketmode).ToList();
            return Ok(tickets);
        }

        [HttpGet("ListAllTicket")]
        public async Task<IActionResult> listAllTickets()
        {
            var userId = Jwt.GetUserIdFromToken(Request.Headers["Authorization"]);
            var user = _context.Accounts.SingleOrDefault(u => u.Email == userId);
            if (user == null)
            {
                return Ok("User not found or token is invalid.");
            }
            var tickets = _context.Tickets.Where(t => t.Accid == user.Accid).ToList();
            var responseTickets = _mapper.Map<List<ResponseTIcket>>(tickets);
            return Ok(responseTickets);
        }

        [HttpPut("applyticket")]
        public async Task<IActionResult> AproveTicket(int bankid, int ticketid)
        {
            var userId = Jwt.GetUserIdFromToken(Request.Headers["Authorization"]);
            var user = _context.Accounts.SingleOrDefault(u => u.Email == userId);
            if (user == null)
            {
                return Ok("User not found or token is invalid.");
            }
            var ticket = _context.Tickets.SingleOrDefault(t => t.Ticketid == ticketid);
            if (ticket == null)
            {
                return Ok("Ticket not found.");
            }
            if (ticket.Accid != user.Accid)
            {
                return Ok("You do not have permission to update this ticket.");
            }
            ticket.Startdate = DateTime.Now;
            ticket.Bankid = bankid;
            await _context.SaveChangesAsync();
            return Ok("Ticket updated.");
        }

        [HttpGet("getExTicket")]
        public async Task<IActionResult> FindTicketOfBank()
        {
            var userId = Jwt.GetUserIdFromToken(Request.Headers["Authorization"]);
            var user = _context.Accounts.SingleOrDefault(u => u.Email == userId);
            if (user == null)
            {
                return Ok("User not found or token is invalid.");
            }

            // Tìm ngân hàng của người dùng
            var bank = _context.Banks.Where(b => b.Accid == user.Accid).ToList(); // Sử dụng ToList() thay vì SingleOrDefault
            if (bank == null || !bank.Any())
            {
                return Ok("Bank not found for the user.");
            }

            List<Object> blist = new List<Object>();

            // Tìm vé của ngân hàng đó
            foreach (var item in bank)
            {
                var ticket = _context.Tickets.FirstOrDefault(t => t.Accid == user.Accid && t.Bankid == item.Bankid); // Sử dụng FirstOrDefault thay vì SingleOrDefault
                if (ticket != null)
                {
                    var ticketResponse = new
                    {
                        id = ticket.Ticketid,
                        name = DateTime.Now + user.Email,
                        status = ticket.Ticketmode
                    };



                    var bankResponse = new
                    {
                        id = item.Bankid,
                        name = item.Bankname,
                        ticket = ticketResponse
                    };

                    blist.Add(bankResponse);
                }
                else
                {
                    var bankResponse = new
                    {
                        id = item.Bankid,
                        name = item.Bankname,
                        ticket = "null",
                    };

                    blist.Add(bankResponse);
                }

            }
            return Ok(blist.ToArray());

        }

    }
}
