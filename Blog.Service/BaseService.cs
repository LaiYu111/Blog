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
        protected readonly IMapper _mapper;
        protected readonly IBaseRepository<TEntity> _baseRepository;

        public BaseService(IMapper mapper, IBaseRepository<TEntity> baseRepository)
        {
            _mapper = mapper;
            _baseRepository = baseRepository;
        }


        #region Create
        public async Task<TVo> AddAsync(TEntity entity)
        {
            var result = await _baseRepository.AddAsync(entity);
            return _mapper.Map<TVo>(result);
        }
        #endregion

        #region Delete

        public async Task DeleteAsync(TEntity entity)
        {
            await _baseRepository.DeleteAsync(entity);
        }
        
        public async Task DeleteAsync(Expression<Func<TEntity, bool>> predicate)
        {
            await _baseRepository.DeleteAsync(predicate);
        }

        public async Task DeleteByIdAsync(object id)
        {
            var entity = await _baseRepository.FindByIdAsync(id);
            if (entity != null)
            {
                await _baseRepository.DeleteAsync(entity);
            }
        }
        #endregion

        #region Read
        public async Task<TVo> FindByIdAsync(object id)
        {
            var result = await _baseRepository.FindByIdAsync(id);
            return _mapper.Map<TVo>(result);
        }

        public async Task<List<TVo>> QueryAsync(Expression<Func<TEntity, bool>> predicate)
        {
            var entities = await _baseRepository.QueryAsync(predicate);
            return _mapper.Map<List<TVo>>(entities);
        }

        public async Task<List<TVo>> QueryAllAsync()
        {
            var entities = await _baseRepository.QueryAllAsync();
            return _mapper.Map<List<TVo>>(entities);
        }
        #endregion

        #region Update

        public async Task<TVo> UpdateAsync(TEntity entity)
        {
            var updatedEntity = await _baseRepository.UpdateAsync(entity);
            return _mapper.Map<TVo>(updatedEntity);
        }
        #endregion
    }
}
