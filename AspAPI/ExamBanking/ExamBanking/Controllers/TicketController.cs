﻿using ExamBanking.DTO.TicketDto;
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
        private readonly ExamBankingContext _context;
        public TicketController(ExamBankingContext context)
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
                Expire = request.Expire,
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
        public async Task<IActionResult> AproveTicket(int BankId, int ticketId)
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
