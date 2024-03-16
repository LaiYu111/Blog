using AutoMapper;
using Blog.IService;
using Blog.Model.Entities;
using Blog.Model.RequestModels;
using Blog.Model.Views;
using Microsoft.AspNetCore.Mvc;

namespace Blog.WebAPI.Controllers
{
    /// <summary>
    /// Article
    /// </summary>
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ArticleController: ControllerBase
    {
        private readonly IBaseService<Article, ArticleVo> _baseService;
        private readonly IArticleService _articleService;
        private readonly IMapper _mapper;

        /// <summary>
        /// Construcutor
        /// </summary>
        /// <param name="baseService"></param>
        /// <param name="articleService"></param>
        /// <param name="mapper"></param>
        public ArticleController(
            IBaseService<Article, ArticleVo> baseService, 
            IArticleService articleService,
            IMapper mapper)
        { 
            _baseService = baseService;
            _articleService = articleService;
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
            return Ok(result);
        }

        /// <summary>
        /// Create Article
        /// </summary>
        /// <param name="article"></param>
        /// <returns></returns>
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
        /// 删除
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public async Task<ActionResult> DeleteArticle(List<long> ids)
        {
            await _baseService.DeleteAsync(x => ids.Contains(x.Id));
            return Ok();
        }
    }
}
