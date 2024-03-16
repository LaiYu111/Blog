using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Extensions.ServiceExtensions
{
    public static class CorsExtension
    {
        public static void AddCustomCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                builder => builder.WithOrigins("http://localhost:3000", "http://localhost:3050") // 指定前端应用的 URL
                                  .AllowAnyMethod()
                                  .AllowAnyHeader()
                                  .AllowCredentials());
            });
        }
    }
}
