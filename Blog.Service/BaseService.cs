using AutoMapper;
using Blog.IService;
using Blog.Model;
using Blog.Repository;
using Blog.Repository.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Service
{
    public class BaseService<TEntity, TVo> : IBaseService<TEntity, TVo> where TEntity : class , new()
    {
        private readonly IMapper _mapper;
        private readonly IBaseRepository<TEntity> _baseRepository;
        public BaseService(IMapper mapper, IBaseRepository<TEntity> baseRepository)
        {
            _mapper = mapper;
            _baseRepository = baseRepository;
        }
        public async Task<List<TVo>> Query()
        {
            var result = await _baseRepository.Query();
            return _mapper.Map<List<TVo>>(result);
        }

        public async Task<long> Add(TEntity entity)
        {
            var result = await _baseRepository.Add(entity);
            return result;
        }
    }
}
