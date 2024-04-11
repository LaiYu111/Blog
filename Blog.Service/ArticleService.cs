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
        private readonly IBaseRepository<Tag> _baseTagRepository; 
        private readonly IBaseRepository<ArticleTag> _baseArticleTagRepository;
        public ArticleService(
            IMapper mapper, 
            IBaseRepository<Article> baseRepository,
            IArticleRepository articleRepository,
            IBaseRepository<Tag> baseTagRepository,
            IBaseRepository<ArticleTag> baseArticleTagRepository
            ) : base(mapper, baseRepository)
        {
            _articleRepository = articleRepository;
            _baseTagRepository = baseTagRepository;
            _baseArticleTagRepository = baseArticleTagRepository;
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

        public async Task<List<ArticleVo>> RecommendedArticles(int size)
        {
            var result = await _articleRepository.RamdomArticles(size);
            return _mapper.Map<List<ArticleVo>>(result);
        }

        public async Task<ArticleVo> AttachTags(List<long> tagIds, long articleId)
        {
            var article = await _baseRepository.FindByIdAsync(articleId);
            //if (article.Tags == null)
            //{
            //    article.Tags = new List<Tag>();
            //}
            //foreach (var id in tagIds)
            //{
            //    var tag = await _baseTagRepository.FindByIdAsync(id);
            //    article.Tags.Add(tag);
            //}
            List<ArticleTag> articleTags = new List<ArticleTag>();
            foreach (var tagId in tagIds)
            {
                var tag = await _baseTagRepository.FindByIdAsync(tagId);
                articleTags.Add(new ArticleTag
                {
                    ArticlesId = articleId,
                    TagsId = tagId,
                });
            }
            var result = await _baseArticleTagRepository.AddBulkAsync(articleTags);
            article.ArticleTags = result;

            return _mapper.Map<ArticleVo>(article);
        }

        public async Task<List<TagVo>> FindTagsAsync(long articleId)
        {
            List<Tag> tags = new List<Tag>();
            var articleTag = await _baseArticleTagRepository.QueryAsync(x => x.ArticlesId == articleId);
            foreach (var tag in articleTag)
            {
                var t = await _baseTagRepository.FindByIdAsync(tag.TagsId);
                tags.Add(t);
            }

            return _mapper.Map<List<TagVo>>(tags);
        }
    }
}
