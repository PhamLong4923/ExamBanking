using ExamBanking.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExamBanking.DTO;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Security.Principal;

namespace ExamBanking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequestModel accountDto)
        {
            string uname = "";
            string token = "";
            uname = accountDto.Username;
            if (uname.Equals("longpham"))
            {
                 token = "this is default token";
                return Ok(token);
            }
             token = "this is wrong token";
            return Ok("user not found");
        }




    }
}
/**
using BackEnd.Models;
using BCrypt.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        public static Account account = new Account();
        private readonly IConfiguration _configuration;
        public AccountController(IConfiguration configuration)
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
            if (accountDto.Username == account.Username && BCrypt.Net.BCrypt.Verify(accountDto.Userpass, account.Userpass))
            {
                string token = CreateToken(account);
                return Ok(token);
            }
            return BadRequest("user not found");
        }

        private string CreateToken(Account account)
        {
            List<Claim> claims = new List<Claim>() {
            new Claim(ClaimTypes.Name, account.Username)

            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
                );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
    }
}

**/
