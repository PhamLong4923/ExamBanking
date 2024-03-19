using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using ExamBanking.Models;
using System.IdentityModel.Tokens.Jwt;
using ExamBanking.DTO.AccountDto;
using ExamBanking.Utils;

namespace ExamBanking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoogleAuthController : ControllerBase
    {
        private readonly ExamBankingContext _context;
        private readonly Jwt _jwt;
        public GoogleAuthController(ExamBankingContext context,Jwt jwt)
        {
            _context = context;
            _jwt = jwt;
        }
        [HttpPost("save-jwt-data")]
        public IActionResult SaveJwtData([FromBody] TokenRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Jwt))
            {
                return BadRequest(new { message = "JWT not provided" });
            }

            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(request.Jwt) as JwtSecurityToken;


            if (jsonToken != null)
            {
                var account = new Account
                {
                    Accname = jsonToken.Claims.FirstOrDefault(c => c.Type == "name")?.Value,
                    Email = jsonToken.Claims.FirstOrDefault(c => c.Type == "email")?.Value,
                    Accid = Convert.ToDecimal(jsonToken.Claims.FirstOrDefault(c => c.Type == "sub")?.Value),
                    Datejoin = DateTime.Now
                   
                };

                // Thêm logic để kiểm tra xem người dùng đã tồn tại trong cơ sở dữ liệu chưa
                var checkExist = _context.Accounts.FirstOrDefault(a => a.Email == account.Email);
                if (checkExist != null)
                {
                    return BadRequest("already exist");
                }
                var token = _jwt.CreateJWTToken(account);
                _context.Accounts.Add(account);
                _context.SaveChanges();

                return Ok(new { message = "Data saved successfully" } + token);
            }

            return BadRequest(new { message = "Invalid JWT format" });
        }

    }
}
