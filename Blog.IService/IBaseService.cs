using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Blog.IService
{
    public interface IBaseService<TEntity, TVo> where TEntity : class
    {
        #region Create

        Task<TVo> AddAsync(TEntity entity);
        Task<List<TVo>> AddBulkAsync(List<TEntity> entities);

        #endregion

        #region Read

        Task<List<TVo>> QueryAllAsync();

        Task<List<TVo>> QueryAsync(Expression<Func<TEntity, bool>> predicate);

        Task<TVo> FindByIdAsync(object id);

        #endregion

        #region Update

        Task<TVo> UpdateAsync(TEntity entity);

        #endregion

        #region Delete

        Task DeleteAsync(TEntity entity);

        Task DeleteAsync(Expression<Func<TEntity, bool>> predicate);

        #endregion

        #region statistic
        Task<List<TVo>> PaginatorAsync(int pageSize, int pageIndex);
        Task<int> CountAsync();
        #endregion
    }
}
