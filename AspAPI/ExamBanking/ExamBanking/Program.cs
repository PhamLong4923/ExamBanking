using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ExamBanking.Config;

namespace ExamBanking
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var configuration = builder.Configuration;

            // Add services to the container.
            builder.Services.AddStartupServices(configuration);

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
        public static void AddStartupServices(this IServiceCollection services, IConfiguration configuration)
        {
            var startup = new Startup(configuration);
            startup.ConfigureServices(services);
        }

        public static void UseStartupConfiguration(this WebApplication app, IWebHostEnvironment env)
        {
            var startup = new Startup();
            startup.Configure(app, env);
        }
    }
}
