using Blog.Model.Entities;
using Blog.Model.Views;
using Microsoft.AspNetCore.Http;


namespace Blog.IService
{
    public interface IArticleService: IBaseService<Article, ArticleVo>
    {
        Task<string> SaveImagesAsync(IFormFile[] images);
    }
}
