using ExamBanking.Config;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace ExamBanking
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddStartupServices();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            var env = app.Services.GetRequiredService<IWebHostEnvironment>();
            app.UseStartupConfiguration(env);

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
