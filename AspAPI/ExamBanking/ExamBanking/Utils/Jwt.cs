using System.IdentityModel.Tokens.Jwt;

namespace ExamBanking.Utils
{
    public class Jwt
    {
        public static string GetUserIdFromToken(IHeaderDictionary headers)
        {
            var token = headers["Authorization"].ToString().Replace("Bearer ", "");
            return GetUserIdFromToken(token);
        }

        private static string GetUserIdFromToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(token) as JwtSecurityToken;

            return jsonToken?.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
        }
    }
}
