using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Extension.ServiceExtensions
{
    public static class SwaggerExtension
    {
        public static void AddCustomSwagger(this IServiceCollection services)
        {
            // 添加Swagger服务
            services.AddSwaggerGen(options =>
            {
                #region 文档注释
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Blog",
                    Version = "V1",
                    Description = ".NET8 + PostgreSQL",
                    Contact = new OpenApiContact
                    {
                        Name = "GitHub参考架构源码地址",
                        Url = new Uri("https://github.com/anjoy8/BCVP.Net8")
                    }
                });

                // 获取xml文件名
                var xmlFile = $"WebAPI.xml";
                // 获取xml文件路径
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                // 添加控制器层注释，true表示显示控制器注释
                options.IncludeXmlComments(xmlPath, true);
                // 对action的名称进行排序，如果有多个，就可以看见效果了
                options.OrderActionsBy(o => o.RelativePath);
                #endregion

            });
        }
    }
}
