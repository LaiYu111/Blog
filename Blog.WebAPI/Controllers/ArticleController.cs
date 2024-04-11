using AutoMapper;
using Blog.Common;
using Blog.IService;
using Blog.Model.Entities;
using Blog.Model.RequestModels;
using Blog.Model.Views;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Blog.WebAPI.Controllers
{
    /// <summary>
    /// Article
    /// </summary>
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ArticleController : ControllerBase
    {
        private readonly IBaseService<Article, ArticleVo> _baseService;
        private readonly IBaseService<ArticleTag, ArticleTag> _baseArticleTagService;
        private readonly IBaseService<Tag, TagVo> _baseTagService;
        private readonly IArticleService _articleService;
        private readonly IMapper _mapper;

        /// <summary>
        /// Construcutor
        /// </summary>
        /// <param name="baseService"></param>
        /// <param name="articleService"></param>
        /// <param name="baseArticleTagService"></param>
        /// <param name="baseTagService"></param>
        /// <param name="mapper"></param>
        public ArticleController(
            IBaseService<Article, ArticleVo> baseService,
            IArticleService articleService,
            IBaseService<ArticleTag, ArticleTag> baseArticleTagService,
            IBaseService<Tag, TagVo> baseTagService,
            IMapper mapper)
        {
            _baseService = baseService;
            _articleService = articleService;
            _baseArticleTagService = baseArticleTagService;
            _baseTagService = baseTagService;
            _mapper = mapper;
        }

        /// <summary>
        /// All Articles
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> AllArticles()
        {
            var result = await _baseService.QueryAllAsync();
            for (int i = 0; i < result.Count; i++)
            {
                var tag = await _articleService.FindTagsAsync(result[i].ArticleId);
                result[i].Tags = tag;
            }
            return Ok(result);
        }

        /// <summary>
        /// Create Article - Admin only
        /// </summary>
        /// <param name="article"></param>
        /// <returns></returns>
        [Authorize(Roles = $"{PolicyNames.Admin}")]
        [HttpPost]
        public async Task<ActionResult> CreateArticle([FromBody] ArticleRequest article)
        {
            var result = await _baseService.AddAsync(_mapper.Map<Article>(article));
            return Ok(result);
        }

        /// <summary>
        /// Save image to ../imageFiles
        /// </summary>
        /// <param name="images"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult> SaveImages([FromForm] IFormFile[] images)
        {
            if (images == null || images.Length == 0) return BadRequest("Empty Files");

            var fileIds = await _articleService.SaveFilesAsync(images);

            return Ok(fileIds);
        }

        /// <summary>
        /// 删除 - Admin only
        /// </summary>
        /// <returns></returns>
        [Authorize(Roles = $"{PolicyNames.Admin}")]
        [HttpDelete]
        public async Task<ActionResult> DeleteArticle([FromQuery] List<long> ids)
        {
            await _baseService.DeleteAsync(x => ids.Contains(x.Id));
            return Ok(true);
        }

        /// <summary>
        /// 获取 Article
        /// </summary>
        /// <param name="pageSize">每页的数量</param>
        /// <param name="pageIndex">当前页数</param>
        /// <returns></returns>
        [HttpGet("{pageSize}/{pageIndex}")]
        public async Task<ActionResult> GetArticles(int pageSize, int pageIndex)
        {
            
            var result = await _articleService.PaginatorAsync(pageSize, pageIndex);

            for (int i = 0; i < result.Count; i++)
            {
                var tag = await _articleService.FindTagsAsync(result[i].ArticleId);
                result[i].Tags = tag;
            }

            return Ok(result);
        }

        /// <summary>
        /// 计算多少articles
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> CountArticles()
        {
            var result = await _articleService.CountAsync();
            return Ok(result);
        }

        /// <summary>
        /// 根据id获取article
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult> GetArticle(long id)
        {
            var article = await _baseService.FindByIdAsync(id);
            var tags = await _articleService.FindTagsAsync(id);
            article.Tags = tags;
            
            return Ok(article);
        }

        /// <summary>
        /// 随机推荐文章
        /// </summary>
        /// <param name="size"></param>
        /// <returns></returns>
        [HttpGet("{size}")]
        public async Task<ActionResult> RecommendedArticles(int size)
        {
            var result = await _articleService.RecommendedArticles(size);
            for (int i = 0; i < result.Count; i++)
            {
                var tag = await _articleService.FindTagsAsync(result[i].ArticleId);
                result[i].Tags = tag;
            }
            return Ok(result);
        }

        /// <summary>
        /// 修改文章
        /// </summary>
        /// <param name="article"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<ActionResult> UpdateArticle([FromBody] ArticleRequest article)
        {
            Article targetArticle = _mapper.Map<Article>(article);
            var result = await _articleService.UpdateAsync(targetArticle);
            return Ok(result);
        }

        /// <summary>
        /// 通过 tag 获取 articles
        /// </summary>
        /// <returns></returns>
        [HttpGet("{tagId}")]
        public async Task<ActionResult> GetArticles(long tagId)
        {
            var articleTags = await _baseArticleTagService.QueryAsync( x => x.TagsId == tagId);
            var result = new List<ArticleVo>();
            if (articleTags != null)
            {
                foreach (var articleTag in articleTags)
                {
                    ArticleVo article = await _baseService.FindByIdAsync(articleTag.ArticlesId);
                    List<TagVo> tag = await _articleService.FindTagsAsync(article.ArticleId);
                    article.Tags = tag;
                    result.Add(article);
                }
            }
            return Ok(result);
        }

        /// <summary>
        ///  贴上标签
        /// </summary>
        /// <param name="tagIds"></param>
        /// <param name="articleId"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult> AttachTags(List<long> tagIds, long articleId)
        {
            var result = await _articleService.AttachTags(tagIds, articleId);
            return Ok(result);
        }
    }
}
