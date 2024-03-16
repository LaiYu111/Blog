using Blog.Model;
using Blog.Model.Entities;
using Blog.Repository.Base;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace Blog.Repository
{
    public class ArticleRepository : BaseRepository<Article>, IArticleRepository
    {
        public ArticleRepository(BlogDBContext dbContext) : base(dbContext)
        {
        }
        public async Task SaveFilesAsync(string savePath, IFormFile file)
        {
            using (var stream = new FileStream(savePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
        }
    }
}
