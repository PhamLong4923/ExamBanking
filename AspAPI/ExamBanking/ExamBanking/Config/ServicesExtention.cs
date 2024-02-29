using AutoMapper;
using ExamBanking.Models;


namespace ExamBanking.Config
{
    public static class ServiceExtensions
    {
        public static void AddCustomServices(this IServiceCollection services)
        {
            //add service
            services.AddDbContext<ExamBankingContext>();
            

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
