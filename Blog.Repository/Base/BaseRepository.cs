using Blog.Model;
using Newtonsoft.Json;
using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Repository.Base
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : class, new()
    {
        private readonly ISqlSugarClient _dbBase;
        public BaseRepository(ISqlSugarClient sqlSugarClient)
        {
            _dbBase = sqlSugarClient;
        }

        public ISqlSugarClient Db => _dbBase;

        public async Task<List<TEntity>> Query()
        {
            await Console.Out.WriteLineAsync(Db.GetHashCode().ToString());
            return await _dbBase.Queryable<TEntity>().ToListAsync();

        }

        public async Task<long> Add(TEntity entity)
        {
            var insert = _dbBase.Insertable(entity);
            return await insert.ExecuteReturnSnowflakeIdAsync();
        }
    }
}
