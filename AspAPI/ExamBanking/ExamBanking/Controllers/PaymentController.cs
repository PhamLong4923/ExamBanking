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


        //[HttpGet("test")]
        //public async Task<IActionResult> Test()
        //{
        //    var payment = _context.Payments.SingleOrDefault(p => p.Payid == 11);
        //    var contentParts = payment.Paycontent.Split('_');
        //    var first = contentParts[3];

        //    return Ok(first);
        //}
        [HttpGet("test2")]
        public async Task<IActionResult> Test2(int id)
        {
            var payment = _context.Payments.SingleOrDefault(p => p.Payid == id);
            var contentParts = payment.Paycontent.Split('_');

            if (contentParts.Length < 4)
            {
                return Ok("Invalid content format.");
            }

            var fourth = contentParts[3];
            var days = contentParts[4];

            var ticket = _context.Tickets.SingleOrDefault(t => t.Ticketid == Convert.ToInt32(fourth));

            if (ticket == null)
            {
                return Ok("Ticket not found.");
            }

            if (DateTime.Now - ticket.Startdate > TimeSpan.FromDays(Convert.ToDouble(ticket.Expire)))
            {
                ticket.Expire += Convert.ToInt32(days);
                return Ok("Greater than");
            }
            else if (DateTime.Now - ticket.Startdate < TimeSpan.FromDays(Convert.ToDouble(ticket.Expire)))
            {
                ticket.Expire = Convert.ToInt32(days);
                return Ok("Less than");
            }
            else
            {
                return Ok("Equal");
            }
        }


        [HttpPost("accept_bill")]

        public async Task<IActionResult> Accept_bill(int payid, int bankid)
        {
            var payment = _context.Payments.SingleOrDefault(p => p.Payid == payid);
            var bank = _context.Banks.SingleOrDefault(b => b.Bankid == bankid);

            if (payment == null)
            {
                return Ok("Payment not found.");
            }

            if (payment.Status == 1)
            {
                payment.Status = 0;
            }
            else
            {
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
                            var newTicket = new Ticket
                            {
                                Accid = payment.Accid,
                                Bankid = bankid,
                                Startdate = DateTime.Now,
                                Expire = Convert.ToInt32(fourth)
                            };
                            _context.Tickets.Add(newTicket);

                        }
                        else if (third == "U")
                        {
                            var days = contentParts[4];
                            var ticket = _context.Tickets.SingleOrDefault(t => t.Ticketid == Convert.ToInt32(fourth));

                            if (ticket.Startdate - DateTime.Now > TimeSpan.FromDays(Convert.ToInt32(ticket.Expire)))
                            {

                                var currentExpire = ticket.Expire;
                                ticket.Expire = currentExpire + Convert.ToInt32(days);
                                ticket.Startdate = DateTime.Now;

                            }
                            else if (ticket.Startdate - DateTime.Now < TimeSpan.FromDays(Convert.ToInt32(ticket.Expire)))
                            {
                                ticket.Expire = Convert.ToInt32(days);
                            }
                        }
                    }
                    else if (second == "BM" && third == "U")
                    {
                        bank.Bankmode = Convert.ToInt32(fourth);
                    }
                }
            }

            payment.Status = 1;
            _context.SaveChanges();
            return Ok(payid);
        }
    }
}


