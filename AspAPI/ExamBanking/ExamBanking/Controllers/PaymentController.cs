using ExamBanking.DTO.PaymentDto;
using ExamBanking.Models;
using ExamBanking.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ExamBanking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class PaymentController : ControllerBase
    {
        private readonly ExamBankingContext _context;
        public PaymentController(ExamBankingContext context)
        {
            _context = context;
        }

        [HttpPost("createPayment")]
        [Authorize(Roles = "User,Admin")]
        public async Task<IActionResult> CreatePayment(CreatePaymentRequest request)
        {
            var userId = Jwt.GetUserIdFromToken(Request.Headers["Authorization"]);
            var user = _context.Accounts.SingleOrDefault(u => u.Email == userId);
            var emailClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email);
            if (emailClaim == null)
            {
                return BadRequest("Email claim not found in the token.");
            }
            if (user == null)
            {
                return Ok("User not found or token is invalid.");
            }

            var payment = new Payment
            {
                Money = request.Money,
                Accid = user.Accid,
                Paydate = DateTime.Now,
                Status = 0,
                Paycontent = request.Paycontent,
            };

            _context.Payments.Add(payment);
            _context.SaveChanges();

            return Ok(payment.Payid);
        }

        [HttpGet("Historical_payment")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> Historical_payment()
        {
            var userId = Jwt.GetUserIdFromToken(Request.Headers["Authorization"]);
            var user = _context.Accounts.SingleOrDefault(u => u.Email == userId);
            if (user == null)
            {
                return Ok("User not found or token is invalid.");
            }

            var payments = _context.Payments.Where(p => p.Accid == user.Accid).ToList();
            return Ok(payments);
        }

        [HttpGet("historical_admin")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Historical_admin()
        {
            var payments = _context.Payments.ToList();
            return Ok(payments);
        }


        //EBS_TK_C_30_1

        [HttpPost("accept_bill")]

        public async Task<IActionResult> Accept_bill(int payid)
        {
            var payment = _context.Payments.SingleOrDefault(p => p.Payid == payid);
            var acc = _context.Accounts.SingleOrDefault(a => a.Accid == payment.Accid);

            if (payment == null)
            {
                return Ok("Payment not found.");
            }


            var contentParts = payment.Paycontent.Split('_');

            if (contentParts.Length < 3)
            {
                return Ok("Invalid content format.");
            }

            var first = contentParts[0];
            var second = contentParts[1];
            var third = contentParts[2];
            var fourth = contentParts[3];


            if (first == "EBS")
            {
                if (second == "TK")
                {
                    if (third == "C")
                    {
                        var tm = Convert.ToInt32(contentParts[4]);
                        var newTicket = new Ticket
                        {
                            Ticketname = TicketNameGen.GenTicketNameFunc(acc.Email, tm == 1 ? "ps" : "tk"),
                            Ticketmode = tm,
                            Accid = payment.Accid,
                            Bankid = null,
                            Startdate = null,
                            Expire = Convert.ToInt32(fourth)
                        };
                        _context.Tickets.Add(newTicket);

                    }
                    else if (third == "U")
                    {
                        var days = contentParts[4];
                        var ticket = _context.Tickets.SingleOrDefault(t => t.Ticketid == Convert.ToInt32(fourth));
                        var time = DateTime.Now - ticket.Startdate;
                        if (ticket.Bankid == null)
                        {
                            ticket.Expire += Convert.ToInt32(days);
                        }
                        else
                        {
                            var remainDays = ticket.Expire - time.Value.Days;
                            if (remainDays > 0)
                            {
                                ticket.Expire = remainDays + Convert.ToInt32(days);
                                ticket.Startdate = DateTime.Now;
                            }
                            else
                            {
                                ticket.Expire = Convert.ToInt32(days);
                                ticket.Startdate = DateTime.Now;
                            }
                        }

                    }
                }
                else if (second == "BM" && third == "U")
                {
                    
                    acc.Bankmode = Convert.ToInt32(fourth);
                }

            }

            payment.Status = 1;
            _context.SaveChanges();
            return Ok(payid);
        }
    }
}


