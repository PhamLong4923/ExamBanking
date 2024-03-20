using AutoMapper;
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
            services.AddScoped<RAccount>();
            services.AddDbContext<ExamBankingContext>();
            services.AddScoped<RAnswer>();
            services.AddScoped<RQuestion>();
            services.AddScoped<RRepositories>();
            services.AddScoped<RSection>();
            services.AddScoped<Jwt>();
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                {
                    builder.WithOrigins("http://localhost:3000")
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
            });

            services.AddAutoMapper(typeof(Startup));
        }
    }
}
