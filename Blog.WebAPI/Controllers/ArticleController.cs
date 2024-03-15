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
        private readonly IMapper _mapper;

        /// <summary>
        /// Construcutor
        /// </summary>
        /// <param name="baseService"></param>
        /// <param name="mapper"></param>
        public ArticleController(IBaseService<Article, ArticleVo> baseService, IMapper mapper)
        { 
            _baseService = baseService;
            _mapper = mapper;
        }

        /// <summary>
        /// All Articles
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> AllArticles()
        {
            var result = await _baseService.QueryAll();
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
            var result = await _baseService.Add(_mapper.Map<Article>(article));
            return Ok(result);
        }

        /// <summary>
        /// 删除
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public async Task<ActionResult> DeleteArticle(List<long> ids)
        {
            await _baseService.Delete(x => ids.Contains(x.Id));
            return Ok();
        }
    }
}
