﻿using Microsoft.AspNetCore.Authorization;
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
using System.Xml.Linq;

namespace ExamBanking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoogleAuthController : ControllerBase
    {
        private readonly ExamBankingContext _context;
        private readonly Jwt _jwt;
        public GoogleAuthController(ExamBankingContext context, Jwt jwt)
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
                    Roleid = 0,
                    Datejoin = DateTime.Now

                };

                // Thêm logic để kiểm tra xem người dùng đã tồn tại trong cơ sở dữ liệu chưa
                var checkExist = _context.Accounts.FirstOrDefault(a => a.Email == account.Email);
                string role = checkExist.Roleid == 1 ? "User" : "Admin";
                if (checkExist != null)
                {
                    string tokenExist = _jwt.CreateJWTToken(account, role);
                    return Ok(tokenExist);
                }
                var token = _jwt.CreateJWTToken(account, role);
                _context.Accounts.Add(account);
                _context.SaveChanges();

                return Ok(token);
            }

            return BadRequest(new { message = "Invalid JWT format" });
        }

    }
}
