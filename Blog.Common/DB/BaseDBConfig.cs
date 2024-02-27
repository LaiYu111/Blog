using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Common.DB
{
    public enum DataBaseType
    {
        MySql = 0,
        SqlServer = 1,
        Sqlite = 2,
        Oracle = 3,
        PostgreSQL = 4,
        Dm = 5,
        Kdbndp = 6,
    }
    public class MutiDBOperate
    {
        /// <summary>
        /// 连接启用开关
        /// </summary>
        public bool Enabled { get; set; }

        /// <summary>
        /// 连接ID
        /// </summary>
        public string ConnId { get; set; }

        /// <summary>
        /// 从库执行级别，越大越先执行
        /// </summary>
        public int? HitRate { get; set; }

        /// <summary>
        /// 连接字符串
        /// </summary>
        public string Connection { get; set; }

        /// <summary>
        /// 数据库类型
        /// </summary>
        public DataBaseType DbType { get; set; }

        /// <summary>
        /// 从库
        /// </summary>
        public List<MutiDBOperate> Slaves { get; set; }
    }
    public class BaseDBConfig
    {
        /// <summary>
        /// 所有库配置
        /// </summary>
        public static readonly List<ConnectionConfig> AllConfigs = new();

        /// <summary>
        /// 有效的库连接(除去Log库)
        /// </summary>
        public static List<ConnectionConfig> ValidConfig = new();

        public static ConnectionConfig MainConfig;
        public static ConnectionConfig LogConfig; //日志库

        public static bool IsMulti => ValidConfig.Count > 1;

        public static (List<MutiDBOperate> allDbs, List<MutiDBOperate> slaveDbs) MutiConnectionString => MutiInitConn();

        /// <summary>
        /// 核心，读取appsettings 启用的 DBS 
        /// </summary>
        /// <returns></returns>
        public static (List<MutiDBOperate>, List<MutiDBOperate>) MutiInitConn()
        {
            List<MutiDBOperate> listdatabase = AppSettings.GetDbSettings()
                .Where(i => i.Enabled).ToList();
            var mainDbId = AppSettings.GetMainDB();
            var mainDbModel = listdatabase.Single(d => d.ConnId == mainDbId);
            listdatabase.Remove(mainDbModel);
            listdatabase.Insert(0, mainDbModel);

            foreach (var i in listdatabase) SpecialDbString(i);
            return (listdatabase, mainDbModel.Slaves);
        }

        private static string DifDBConnOfSecurity(params string[] conn)
        {
            foreach (var item in conn)
            {
                try
                {
                    if (File.Exists(item))
                    {
                        return File.ReadAllText(item).Trim();
                    }
                }
                catch (Exception)
                {
                }
            }

            return conn[conn.Length - 1];
        }

        /// <summary>
        /// 定制Db字符串
        /// 目的是保证安全：优先从本地txt文件获取，若没有文件则从appsettings.json中获取
        /// </summary>
        /// <param name="mutiDBOperate"></param>
        /// <returns></returns>
        private static MutiDBOperate SpecialDbString(MutiDBOperate mutiDBOperate)
        {
            switch (mutiDBOperate.DbType)
            {
                case DataBaseType.Sqlite:
                    mutiDBOperate.Connection =
                   $"DataSource=" + Path.Combine(Environment.CurrentDirectory, mutiDBOperate.Connection);
                    break;
                case DataBaseType.SqlServer:
                    mutiDBOperate.Connection = DifDBConnOfSecurity(@"D:\my-file\dbCountPsw1_SqlserverConn.txt",
                          mutiDBOperate.Connection);
                    break;
                case DataBaseType.Oracle:
                    mutiDBOperate.Connection =
                    DifDBConnOfSecurity(@"D:\my-file\dbCountPsw1_OracleConn.txt", mutiDBOperate.Connection);
                    break;
                case DataBaseType.MySql:
                    mutiDBOperate.Connection =
                   DifDBConnOfSecurity(@"D:\my-file\dbCountPsw1_MySqlConn.txt", mutiDBOperate.Connection);
                    break;
                default: break;
            }
            return mutiDBOperate;
        }
    }
}
