using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Common
{

    public class JwtSettings
    {
        public string Key {  get; set; }
        public string Audience { get; set; }
        public string Issuer { get; set; }
    }

    /// <summary>
    /// appsettings.json 注入单例模式/appsettigns.json 入口
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
            catch (Exception ex) { }
            return "";
        }

        /// <summary>
        /// AppSettings 中的 JwtSettings
        /// </summary>
        /// <returns></returns>
        public static JwtSettings? GetJwtSettings()
        {
            try
            {
                var jwtSettings = new JwtSettings();
                Configuration.GetSection("JwtSettings").Bind(jwtSettings);
                return jwtSettings;
            }
            catch (Exception ex)
            {
                // 在实际应用中，应该记录异常信息
                return null;
            }
        }

        /// <summary>
        /// 获取图片存放路径
        /// </summary>
        /// <returns></returns>
        public static string GetImageStoragePath()
        {
            return Configuration["ImageStoragePath"];
        }
    }
}
