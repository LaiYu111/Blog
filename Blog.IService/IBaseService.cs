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
    }
}
