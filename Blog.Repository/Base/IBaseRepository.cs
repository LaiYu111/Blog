using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Repository.Base
{
    public interface IBaseRepository<TEntity> where TEntity : class
    {
        /// <summary>
        /// 运行外部访问，不能set操作
        /// </summary>
        ISqlSugarClient Db { get; }
        Task<List<TEntity>> Query();
    }
}
