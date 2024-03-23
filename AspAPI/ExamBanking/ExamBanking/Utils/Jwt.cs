using ExamBanking.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ExamBanking.Utils
{
    public class Jwt
    {

        private readonly IConfiguration _configuration;
        public Jwt(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public static string? GetUserId(string token)
        {
            if (string.IsNullOrEmpty(token))
                return null;


            if (token.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
            {
                token = token.Substring("Bearer ".Length).Trim();
            }

            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(token) as JwtSecurityToken;

            if (jsonToken == null)
                return null;

            var userIdClaim = jsonToken.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.Value;


            return userIdClaim;
        }

        public static string GetUserIdFromToken(string authorizationHeader)
        {

            var token = authorizationHeader.ToString();
            return Jwt.GetUserId(token);
        }

        public string CreateJWTToken(Account user)
        {
            List<Claim> claims = new List<Claim> {
             new Claim(ClaimTypes.Email, user.Email),
             new Claim(ClaimTypes.Role, "User"),
             new Claim("bankmode", user.Bankmode.ToString())
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSetting:Token").Value!));

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
