using AutoMapper;
using ExamBanking.Mapping;
using ExamBanking.Models;
using ExamBanking.Repositories;
using ExamBanking.Utils;


namespace ExamBanking.Config
{
    public static class ServiceExtensions
    {
        public static void AddCustomServices(this IServiceCollection services)
        {
            //add service
            services.AddAutoMapper(typeof(TicketMapping));

            services.AddScoped<RAccount>();
            services.AddDbContext<ExamBankingContext>();
            services.AddScoped<RAnswer>();
            services.AddScoped<RQuestion>();
            services.AddScoped<RRepositories>();
            services.AddScoped<RSection>();
            services.AddScoped<RTicket>();
            services.AddScoped<Jwt>();
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                {
                    builder.WithOrigins(
                        "http://localhost:3000",
                        "https://exambankingv1.azurewebsites.net",
                        "https://exambanking-81cef.web.app",
                        "https://exambanking-81cef.firebaseapp.com"
                    )
                    .AllowAnyMethod()
                    .AllowAnyHeader();
                });
            });

            services.AddAutoMapper(typeof(Startup));
        }
    }
}
