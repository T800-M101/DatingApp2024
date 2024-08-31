
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extentions
{
    public static class ApplicationServiceExtentions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            // Add services to the container. 
            services.AddControllers();
            services.AddDbContext<DataContext>(opt => 
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            // Add CORS services
            services.AddCors();
            // Add Token Service
            services.AddScoped<ITokenService, TokenService>();

        return services;
        
        }
        
    }
}