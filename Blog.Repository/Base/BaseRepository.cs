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
        protected readonly BlogDBContext _dbContext;
        public BaseRepository(BlogDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        #region Create

        public async Task<TEntity> AddAsync(TEntity entity)
        {
            _dbContext.Set<TEntity>().Add(entity);
            await _dbContext.SaveChangesAsync();
            return entity;
        }

        public async Task<List<TEntity>> AddBulkAsync(List<TEntity> entities)
        {
            await _dbContext.Set<TEntity>().AddRangeAsync(entities);
            await _dbContext.SaveChangesAsync();
            return entities;
        }

        #endregion

        #region Read

        public async Task<List<TEntity>> QueryAllAsync()
        {
            return await _dbContext.Set<TEntity>().ToListAsync();
        }

        // 根据条件查询
        public async Task<List<TEntity>> QueryAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await _dbContext.Set<TEntity>().Where(predicate).ToListAsync();
        }

        // 根据主键查询单个实体
        public async Task<TEntity?> FindByIdAsync(object id)
        {
            return await _dbContext.Set<TEntity>()
                .FindAsync(id);
        }


        public async Task<TEntity?> FindAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await _dbContext.Set<TEntity>().Where(predicate).FirstOrDefaultAsync();
        }

        #endregion

        #region Update

        public async Task<TEntity> UpdateAsync(TEntity entity)
        {
            var trackedEntity = _dbContext.Set<TEntity>().Update(entity);
            await _dbContext.SaveChangesAsync();
            return trackedEntity.Entity;
        }

        #endregion

        #region Delete

        public async Task DeleteAsync(TEntity entity)
        {
            _dbContext.Set<TEntity>().Remove(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Expression<Func<TEntity, bool>> predicate)
        {
            await _dbContext.Set<TEntity>().Where(predicate).ExecuteDeleteAsync();
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAllAsync(Expression<Func<TEntity, bool>> predicate)
        {
            await _dbContext.Set<TEntity>().Include(predicate).ExecuteDeleteAsync();
            await _dbContext.SaveChangesAsync();
        }

        #endregion

        #region Statistic
        public async Task<List<TEntity>> PaginatorAsync(int pageSize, int pageIndex)
        {
            return await _dbContext.Set<TEntity>()
                .Skip((pageIndex -1 ) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task<int> CountAsync()
        {
            return await _dbContext.Set<TEntity>().CountAsync();
        }
        #endregion
    }
}
