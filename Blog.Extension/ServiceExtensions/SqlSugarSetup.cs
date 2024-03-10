using Blog.Common;
using Blog.Common.DB;
using Blog.Model;
using Blog.Model.Entities;
using Microsoft.Extensions.DependencyInjection;
using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Extension.ServiceExtensions
{
    /// <summary>
    /// SqlSugar 启动服务
    /// </summary>
    public static class SqlSugarSetup
    {
        public static void AddSqlSugarSetup(this IServiceCollection services)
        {
            if (services == null) throw new ArgumentNullException(nameof(services));

            if (!string.IsNullOrEmpty(AppSettings.GetMainDB()))
            {
                MainDb.CurrentDbConnId = AppSettings.GetMainDB();
            }

            BaseDBConfig.MutiConnectionString.allDbs.ForEach(m =>
            {
                var config = new ConnectionConfig()
                {
                    ConfigId = m.ConnId.ObjToString(),
                    ConnectionString = m.Connection,
                    DbType = (DbType)m.DbType,
                    IsAutoCloseConnection = true,
                    MoreSettings = new ConnMoreSettings()
                    {
                        IsAutoRemoveDataCache = true,
                        SqlServerCodeFirstNvarchar = true,
                    },
                    InitKeyType = InitKeyType.Attribute
                };
                if (SqlSugarConst.LogConfigId.ToLower().Equals(m.ConnId.ToLower()))
                {
                    BaseDBConfig.LogConfig = config;
                }
                else
                {
                    BaseDBConfig.ValidConfig.Add(config);
                }

                BaseDBConfig.AllConfigs.Add(config);

            });

            if (BaseDBConfig.LogConfig is null)
            {
                throw new ApplicationException("未配置Log库连接");
            }

            // SqlSugarScope是线程安全，可使用单例注入
            // 参考：https://www.donet5.com/Home/Doc?typeId=1181
            services.AddSingleton<ISqlSugarClient>(o =>
            {
                //return new SqlSugarScope(BaseDBConfig.AllConfigs, db =>
                //{
                //    BaseDBConfig.ValidConfig.ForEach(config =>
                //    {
                //        var dbProvider = db.GetConnectionScope((string)config.ConfigId);
                //    });
                //});
                return new SqlSugarScope(BaseDBConfig.AllConfigs);
            });


            var serviceProvider = services.BuildServiceProvider();

            // Code First
            var Db = serviceProvider.GetService<ISqlSugarClient>();

            if (Db != null)
            {
                Db.DbMaintenance.CreateDatabase();
                Db.CodeFirst.InitTables(typeof(User), typeof(Role), typeof(Article));
            }
        }

    }
}
