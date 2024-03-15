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
        Task<TVo> Add(TEntity entity);
        Task<List<TVo>> QueryAll();
        Task<List<TVo>> Query(Expression<Func<TEntity, bool>> predicate);
        Task<TVo> Update(TEntity entity);
        Task Delete(TEntity entity);
        Task Delete(Expression<Func<TEntity, bool>> predicate);
        Task<TVo> FindById(object id);
    }
}
