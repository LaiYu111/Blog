using Blog.Model.Entities;
using Blog.Repository.Base;
using Microsoft.AspNetCore.Http;
using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Repository
{
    public class ArticleRepository : BaseRepository<Article>, IArticleRepository
    {
        public ArticleRepository(ISqlSugarClient sqlSugarClient) : base(sqlSugarClient)
        {
        }

        public async Task<string> SaveImagesAsync(IFormFile[] images , string path)
        {
            foreach (var image in images)
            {
                var filePath = Path.Combine(path, image.FileName);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }
            }
            return path;
        }
    }
}
