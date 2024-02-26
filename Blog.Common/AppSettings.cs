using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Common
{
    public class Redis
    {
        public bool Enable { get; set; }
        public string ConnectionString { get; set; }
        public string InstanceName { get; set; }
    }

    /// <summary>
    /// appsettings.json 注入单例模式
    /// </summary>
    public class AppSettings
    {
        public static IConfiguration Configuration { get; set; }
        public AppSettings() { }
        public AppSettings(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        /// <summary>
        /// 用法： AppSettings.GetValue("Redis:ConnectionString");
        /// </summary>
        /// <param name="sectionsPath"></param>
        /// <returns></returns>
        public static string GetValue(string sectionsPath)
        {
            try
            {  
                return Configuration[sectionsPath];
            }
            catch(Exception ex) { }
            return "";
        }
        // 重载 GetValue 方法以返回 Redis 对象
        public static Redis GetRedisSettings()
        {
            try
            {
                var redisSettings = new Redis();
                Configuration.GetSection("Redis").Bind(redisSettings);
                return redisSettings;
            }
            catch (Exception ex)
            {
                // 在实际应用中，应该记录异常信息
                return null;
            }
        }

    }
}
