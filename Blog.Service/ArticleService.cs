using AutoMapper;
using Blog.Common;
using Blog.IService;
using Blog.Model.Entities;
using Blog.Model.Views;
using Blog.Repository;
using Blog.Repository.Base;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace Blog.Service
{
    public class ArticleService : BaseService<Article, ArticleVo>, IArticleService
    {
        private readonly IArticleRepository _articleRepository;
        public ArticleService(
            IMapper mapper, 
            IBaseRepository<Article> baseRepository,
            IArticleRepository articleRepository
            ) : base(mapper, baseRepository)
        {
            _articleRepository = articleRepository;
        }

        public async Task<List<string>> SaveFilesAsync(IFormFile[] files)
        {
            string path = AppSettings.GetImageStoragePath();
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            List<string> fileIds = new List<string>();
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    // 生成一个唯一的文件名（使用GUID以避免文件名冲突）
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

                    // 定义文件的保存路径
                    var savePath = Path.Combine(path, fileName);

                    await _articleRepository.SaveFilesAsync(savePath, file);
                    
                    fileIds.Add(fileName);
                }
            }
            return fileIds;
        }
    }
}
