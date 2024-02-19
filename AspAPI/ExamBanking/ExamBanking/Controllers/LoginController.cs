using ExamBanking.DTO;
using ExamBanking.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ExamBanking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        public static Account account = new Account();
        private readonly IConfiguration _configuration;

        public LoginController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpPost("register")]
        public ActionResult<Account> Register(AccountDto accountDto)
        {
            account.Username = accountDto.Username;
            account.Userpass = BCrypt.Net.BCrypt.HashPassword(accountDto.Userpass);
            account.Accname = accountDto.Accname;
            account.Email = accountDto.Email;
            account.DateJoin = accountDto.DateJoin;
            account.RoleId = accountDto.RoleId;
            return Ok(account);
        }
        [HttpPost("login")]
        public ActionResult<Account> Login(AccountDto accountDto)
        {
            if (account.Username == accountDto.Username && BCrypt.Net.BCrypt.Verify(accountDto.Userpass, account.Userpass))
            {
                string token = CreateToken(account);
                return Ok(token);
            }

            return StatusCode(StatusCodes.Status401Unauthorized);
        }

        private string CreateToken(Account account)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, account.Username),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("Appsettings:Token").Value!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token =  new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
    }
}
