using Blog.IService;
using Blog.Model.Views;
using Blog.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Blog.Model.Entities;
using AutoMapper;
using Blog.Repository.Base;
using Microsoft.AspNetCore.Http;
using Blog.Repository;
using Blog.Common;

namespace Blog.Service
{
    public class ArticleService : BaseService<Article, ArticleVo>, IArticleService
    {
        private readonly IArticleRepository _articleRepository;
        public ArticleService(IMapper mapper, 
            IBaseRepository<Article> baseRepository,
            IArticleRepository articleRepository
            ) : base(mapper, baseRepository)
        {
            _articleRepository = articleRepository;
        }

        public async Task<string> SaveImagesAsync(IFormFile[] images)
        {
            string path = AppSettings.GetImageStoragePath();
            if ( !Directory.Exists(path) )
            {
                Directory.CreateDirectory(path);
            }


            return await _articleRepository.SaveImagesAsync( images, path);
        }
    }
}
