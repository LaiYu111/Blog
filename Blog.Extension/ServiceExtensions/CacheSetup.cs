using Blog.Common;
using Blog.Common.Caches;
using Blog.Extension.Redis;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Extension.ServiceExtensions
{
    public static class CacheSetup
    {
        /// <summary>
        /// 注册缓存 - 没有redis 则使用内存缓存
        /// </summary>
        /// <param name="services"></param>
        public static void AddCacheSetup(this IServiceCollection services)
        {
            var redisSettings = AppSettings.GetRedisSettings();

            if (redisSettings.Enable)
            {
                // https://www.bilibili.com/video/BV13g4y1Z7in?p=13&spm_id_from=pageDriver&vd_source=087397ebe4934518c1f214b92fed4ccb
                // 配置启动Redis服务，虽然可能影响项目启动速度，但是不能在运行的时候报错，所以是合理的
                services.AddSingleton<IConnectionMultiplexer>(sp =>
                {
                    var configuration = ConfigurationOptions.Parse(redisSettings.ConnectionString, true);
                    configuration.ResolveDns = true;
                    return ConnectionMultiplexer.Connect(configuration);
                });
                services.AddSingleton(p => p.GetService<IConnectionMultiplexer>() as ConnectionMultiplexer);

                // 使用 Redis
                services.AddStackExchangeRedisCache(options =>
                {
                    options.Configuration = redisSettings.ConnectionString;
                    if (!string.IsNullOrEmpty(redisSettings.InstanceName)) options.InstanceName = redisSettings.InstanceName;
                });
                services.AddTransient<IRedisBasketRepository, RedisBasketRepository>();

            }
            else
            {
                // 使用内存
                services.AddMemoryCache();
                services.AddDistributedMemoryCache();
            }
            services.AddSingleton<ICaching, Caching>();
        }
    }
}
