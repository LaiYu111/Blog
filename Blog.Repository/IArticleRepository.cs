using Blog.Model;
using Blog.Model.Entities;
using Blog.Repository.Base;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Repository
{
    public interface IArticleRepository : IBaseRepository<Article>
    {
        Task<string> SaveImagesAsync(IFormFile[] images, string path);
    }
}
