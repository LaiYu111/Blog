using AutoMapper;
using Blog.IService;
using Blog.Model.Entities;
using Blog.Model.RequestModels;
using Blog.Model.Views;
using Microsoft.AspNetCore.Mvc;

namespace Blog.WebAPI.Controllers
{
    /// <summary>
    /// Tag Controller
    /// </summary>
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class TagController : ControllerBase
    {
        private readonly IBaseService<Tag, TagVo> _baseService;
        private readonly IArticleService _articleService;
        private readonly IMapper _mapper;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="baseService"></param>
        /// <param name="mapper"></param>
        /// <param name="articleService"></param>
        public TagController(IBaseService<Tag, TagVo> baseService, IMapper mapper, IArticleService articleService)
        {
            _baseService = baseService;
            _mapper = mapper;
            _articleService = articleService;
        }

        /// <summary>
        /// 获取所有的 Tag
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult> GetTagById(long id)
        {
            var result =  await _baseService.FindByIdAsync(id);
            return Ok(result);
        }

        /// <summary>
        /// 获取所有的 Tag
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> AllTags()
        {
            var result = await _baseService.QueryAllAsync();
            return Ok(result);
        }

        /// <summary>
        /// 通过 TagName 获取 tag
        /// </summary>
        /// <param name="tagRequest"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> GetTagByName([FromBody] TagRequest tagRequest)
        {
            Tag tag = _mapper.Map<Tag>(tagRequest);
            var result = await _baseService.QueryAsync(t => t.TagName == tag.TagName);
            return Ok(result);
        }

        /// <summary>
        /// 批量创建 Tag 
        /// </summary>
        /// <param name="tagRequest"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult> CreateTags([FromBody] List<TagRequest> tagRequest)
        {
            List<Tag> tags = _mapper.Map<List<Tag>>(tagRequest);
            var result = await _baseService.AddBulkAsync(tags);
            return Ok(result);
        }

        
    }
}
