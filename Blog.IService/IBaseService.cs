using Blog.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.IService
{
    public interface IBaseService<TEntity, TVo> where TEntity : class
    {
        Task<List<TVo>> Query();

        Task<long> Add(TEntity entity);
    }
}
