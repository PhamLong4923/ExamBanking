﻿using ExamBanking.DTO.AccountDto;
using ExamBanking.DTO.BankDto;
using ExamBanking.Models;
using ExamBanking.Repositories;
using ExamBanking.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace ExamBanking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "User")]
    public class BankController : ControllerBase
    {

        private readonly ExamBankingContext _context;
        private readonly RRepositories _rRepositories;
     
    
        public BankController(ExamBankingContext context, RRepositories rRepositories, RAccount rAccount)
        {
            _context = context;
            _rRepositories = rRepositories;
          
        }


        [HttpGet("GetBank")]
        public IActionResult viewBankList()
        {
            var userId = Jwt.GetUserIdFromToken(Request.Headers["Authorization"]);

            // Sử dụng userId để truy vấn người dùng từ cơ sở dữ liệu
            var user = _context.Accounts.SingleOrDefault(u => u.Email == userId);

            if (user != null)
            {
                var listBank = _context.Banks.Where(a => a.Accid == user.Accid).ToList();

                return Ok(listBank);
            }
            else
            {
                return Ok("User not found or token is invalid.");
            }
        }



        [HttpPost("CreateBank")]
        public async Task<IActionResult> CreateBank(CreateBankRequest request)
        {
            var userId = Jwt.GetUserIdFromToken(Request.Headers["Authorization"]);

            var user = _context.Accounts.SingleOrDefault(u => u.Email == userId);

            if (_context.Banks.Any(b => b.Accid == user.Accid && b.Bankname == request.Bankname))
            {
                return BadRequest("Bank name already exists ");
            }
            var bank = new Bank
            {
                Bankname = request.Bankname,
                Bankstatus = request.Bankstatus,
                Accid = user.Accid,
            };

            _context.Banks.Add(bank);
            await _context.SaveChangesAsync();
            return Ok("bank has benn created!!");
        }
        [HttpPut("EditBank")]
        public async Task<IActionResult> EditBank(RenameBank request)
        {
            var userId = Jwt.GetUserIdFromToken(Request.Headers["Authorization"]);

            var user = _context.Accounts.SingleOrDefault(u => u.Email == userId);

            var edit = _context.Banks.FirstOrDefault(a => a.Accid == user.Accid && a.Bankid == request.Bankid);
            if (edit == null)
            {
                return BadRequest("not found");
            }
            edit.Bankname = request.Bankname;
            _context.SaveChangesAsync();
            return Ok("Edit Succes");
        }
        [HttpDelete("DeleteBank")]
        public async Task<IActionResult> DeleteBank(DeleteBankRequest request)
        {
            var userId = Jwt.GetUserIdFromToken(Request.Headers["Authorization"]);

            var user = _context.Accounts.SingleOrDefault(u => u.Email == userId);

            var remove = _context.Banks.FirstOrDefault(a => a.Accid == user.Accid && a.Bankid == request.Bankid);
            if (remove == null)
            {
                return BadRequest("Bank doesnt exist!!");
            }
            _rRepositories.DeleteAllRepo(request.Bankid);
            _context.Banks.Remove(remove);
            _context.SaveChangesAsync();
            return Ok("Delete Succes");
        }

    }
}
