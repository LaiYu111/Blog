using Blog.Model.Entities;
using Blog.Model.Views;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.IService
{
    public interface IArticleService : IBaseService<Article, ArticleVo>
    {
        Task<List<string>> SaveFilesAsync(IFormFile[] files);
    }
}
