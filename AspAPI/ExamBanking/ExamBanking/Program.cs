using ExamBanking.Config;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Text;

namespace ExamBanking
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                {
                    Description = "Standard Authorization header using the Bearer scheme (\"bearer {token}\")",
                    In = ParameterLocation.Header,
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey
                });
                options.OperationFilter<SecurityRequirementsOperationFilter>();
            });
            builder.Services.AddAuthentication(
                JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder
                        .Configuration.GetSection("AppSetting:Token").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false

                    };
                });
            // Add services to the container.
            builder.Services.AddStartupServices();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            var env = app.Services.GetRequiredService<IWebHostEnvironment>();
            app.UseStartupConfiguration(env);
            app.UseAuthentication();
            app.UseAuthorization();
            app.Run();
        }
    }

    public static class WebApplicationExtensions
    {
        public static void AddStartupServices(this IServiceCollection services)
        {
            var startup = new Startup();
            startup.ConfigureServices(services);
        }

        public static void UseStartupConfiguration(this WebApplication app, IWebHostEnvironment env)
        {
            var startup = new Startup();
            startup.Configure(app, env);
        }
    }
}
