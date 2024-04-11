using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Repository.Base
{
    public interface  IBaseRepository<TEntity> where TEntity : class
    {
        //Task<TEntity> Add(TEntity entity);
        //Task<List<TEntity>> QueryAll();
        //Task<List<TEntity>> Query(Expression<Func<TEntity, bool>> predicate);
        //Task<TEntity> Update(TEntity entity);
        //Task Delete(TEntity entity);
        //Task Delete(Expression<Func<TEntity, bool>> predicate);
        //Task<TEntity> FindById(object id);

        

        #region Create

        Task<TEntity> AddAsync(TEntity entity);
        Task<List<TEntity>> AddBulkAsync(List<TEntity> entities);

        #endregion

        #region Read

        Task<List<TEntity>> QueryAllAsync();

        Task<List<TEntity>> QueryAsync(Expression<Func<TEntity, bool>> predicate);

        Task<TEntity?> FindByIdAsync(object id);

        Task<TEntity?> FindAsync(Expression<Func<TEntity, bool>> predicate);
        #endregion

        #region Update

        Task<TEntity> UpdateAsync(TEntity entity);

        #endregion

        #region Delete

        Task DeleteAsync(TEntity entity);

        Task DeleteAsync(Expression<Func<TEntity, bool>> predicate);

        #endregion

        #region Statistic
        Task<List<TEntity>> PaginatorAsync(int pageSize, int pageIndex);
        Task<int> CountAsync();
        #endregion
    }
}
