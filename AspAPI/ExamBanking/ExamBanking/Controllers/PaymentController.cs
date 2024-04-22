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
                Paycontent = request.Paycontent + "_" + emailClaim.Value,
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

        [HttpPost("accept_bill")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Accept_bill(int payid)
        {
            var payment = _context.Payments.SingleOrDefault(p => p.Payid == payid);
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
                payment.Status = 1;
            }
            _context.SaveChanges();
            return Ok(payment.Payid);
        }
        

    }
}


