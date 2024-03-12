using ExamBanking.Utils;
using System.IdentityModel.Tokens.Jwt;

namespace ExamBanking.Repositories
{
    public class RAccount
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public string GetUserIdFromToken()
        {
            return Jwt.GetUserIdFromToken(_httpContextAccessor.HttpContext.Request.Headers);
        }
    }
}
