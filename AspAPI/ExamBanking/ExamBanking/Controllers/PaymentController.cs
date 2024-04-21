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
    [Authorize(Roles = "User")]
    public class PaymentController : ControllerBase
    {
        private readonly ExamBankingContext _context;
        public PaymentController(ExamBankingContext context)
        {
            _context = context;
        }
        [HttpPost("createPayment")]
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

    }
}


