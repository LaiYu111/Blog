using AutoMapper;
using Blog.IService;
using Blog.Repository.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Service
{
    public class BaseService<TEntity, TVo> : IBaseService<TEntity, TVo> where TEntity : class, new()
    {
        private readonly IMapper _mapper;
        private readonly IBaseRepository<TEntity> _baseRepository;

        public BaseService(IMapper mapper, IBaseRepository<TEntity> baseRepository)
        {
            _mapper = mapper;
            _baseRepository = baseRepository;
        }

        public async Task<TVo> Add(TEntity entity)
        {
            var result = await _baseRepository.Add(entity);
            return _mapper.Map<TVo>(result);
        }

        public async Task Delete(TEntity entity)
        {
            await _baseRepository.Delete(entity);
        }

        public async Task Delete(Expression<Func<TEntity, bool>> predicate)
        {
            await _baseRepository.Delete(predicate);
        }

        public async Task DeleteById(object id)
        {

        }

        public async Task<TVo> FindById(object id)
        {
            var result = await _baseRepository.FindById(id);
            return _mapper.Map<TVo>(result);
        }

        public async Task<List<TVo>> Query(Expression<Func<TEntity, bool>> predicate)
        {
            var entities = await _baseRepository.Query(predicate);
            return _mapper.Map<List<TVo>>(entities);
        }

        public async Task<List<TVo>> QueryAll()
        {
            var entities = await _baseRepository.QueryAll();
            return _mapper.Map<List<TVo>>(entities);
        }

        public async Task<TVo> Update(TEntity entity)
        {
            var updatedEntity = await _baseRepository.Update(entity);
            return _mapper.Map<TVo>(updatedEntity);
        }
    }
}
