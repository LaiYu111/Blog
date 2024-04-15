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
        [Authorize(Roles = $"{PolicyNames.Guest},{PolicyNames.Admin}")]
        [HttpPost]
        public async Task<ActionResult> CreateTags([FromBody] List<TagRequest> tagRequest)
        {
            List<Tag> tags = _mapper.Map<List<Tag>>(tagRequest);
            var result = await _baseService.AddBulkAsync(tags);
            return Ok(result);
        }

        /// <summary>
        /// 分页
        /// </summary>
        /// <param name="pageSize"></param>
        /// <param name="pageIndex"></param>
        /// <returns></returns>
        [HttpGet("{pageSize}/{pageIndex}")]
        public async Task<ActionResult> GetTags(int pageSize, int pageIndex)
        {
            var result = await _baseService.PaginatorAsync(pageSize, pageIndex);
            return Ok(result);
        }

        /// <summary>
        /// 计算数量
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> CountTags()
        {
            var count = await _baseService.CountAsync();
            return Ok(count);
        }

        /// <summary>
        /// 更新 Tag
        /// </summary>
        /// <param name="tagRequest"></param>
        /// <returns></returns>
        [Authorize(Roles = $"{PolicyNames.Guest},{PolicyNames.Admin}")]
        [HttpPut]
        public async Task<ActionResult> UpdateTag([FromBody] TagRequest tagRequest)
        {
            var result = await _baseService.UpdateAsync(_mapper.Map<Tag>(tagRequest));
            return Ok(result);
        }

        /// <summary>
        /// 删除Tag
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        [Authorize(Roles = $"{PolicyNames.Guest},{PolicyNames.Admin}")]
        [HttpDelete]
        public async Task<ActionResult> DeleteTag([FromQuery] List<long> ids)
        {
            await _baseService.DeleteAsync(x => ids.Contains(x.Id));
            return Ok(true);
        }
    }
}
