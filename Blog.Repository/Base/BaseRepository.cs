using Blog.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Repository.Base
{
    public class BaseRepository<TEntity>: IBaseRepository<TEntity> where TEntity : class, new()
    {
        private readonly BlogDBContext _dbContext;
        public BaseRepository(BlogDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<TEntity> Add(TEntity entity)
        {
            _dbContext.Set<TEntity>().Add(entity);
            await _dbContext.SaveChangesAsync();
            return entity;
        }

        public async Task<List<TEntity>> QueryAll()
        {
            return await _dbContext.Set<TEntity>().ToListAsync();
        }

        // 根据条件查询
        public async Task<List<TEntity>> Query(Expression<Func<TEntity, bool>> predicate)
        {
            return await _dbContext.Set<TEntity>().Where(predicate).ToListAsync();
        }


        // 更新
        public async Task<TEntity> Update(TEntity entity)
        {
            var trackedEntity = _dbContext.Set<TEntity>().Update(entity);
            await _dbContext.SaveChangesAsync();
            return trackedEntity.Entity;
        }

        // 删除
        public async Task Delete(TEntity entity)
        {
            _dbContext.Set<TEntity>().Remove(entity);
            await _dbContext.SaveChangesAsync();
        }
        
        public async Task Delete(Expression<Func<TEntity, bool>> predicate)
        {
            await _dbContext.Set<TEntity>().Where(predicate).ExecuteDeleteAsync();
            await _dbContext.SaveChangesAsync();
        }

        // 根据主键查询单个实体
        public async Task<TEntity> FindById(object id)
        {
            return await _dbContext.Set<TEntity>().FindAsync(id);
        }
    }
}
