using Blog.Common;
using Blog.Common.Enums;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Extensions.ServiceExtensions
{
    public static class AuthorizationExtension
    {
        public static void AddAuthor(this IServiceCollection services)
        {
            services.AddAuthorization(options =>
            {
                options.AddPolicy(PolicyNames.Admin, policy => policy.RequireRole(PolicyNames.Admin));
                options.AddPolicy(PolicyNames.Guest, policy => policy.RequireRole(PolicyNames.Guest));
            });
        }
    }
}
