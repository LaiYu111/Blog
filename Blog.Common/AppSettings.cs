using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Common
{
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
    }
}
