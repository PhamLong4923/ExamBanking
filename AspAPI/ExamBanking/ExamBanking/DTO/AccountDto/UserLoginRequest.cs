﻿using System.ComponentModel.DataAnnotations;

namespace ExamBanking.DTO.AccountDto
{
    public class UserLoginRequest
    {
        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;
       
       
    }
}
