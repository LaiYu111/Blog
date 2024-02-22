using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Extension
{
    /// <summary>
    /// SqlSugar 启动服务
    /// </summary>
    public class SqlSugarSetup
    {
        public static void AddSqlSugarSetup(IServiceCollection services)
        {
            if (services == null) throw new ArgumentNullException(nameof(services));


        }

    }
}
