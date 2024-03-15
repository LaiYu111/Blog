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
        Task<TEntity> Add(TEntity entity);
        Task<List<TEntity>> QueryAll();
        Task<List<TEntity>> Query(Expression<Func<TEntity, bool>> predicate);
        Task<TEntity> Update(TEntity entity);
        Task Delete(TEntity entity);
        Task Delete(Expression<Func<TEntity, bool>> predicate);
        Task<TEntity> FindById(object id);
    }
}
