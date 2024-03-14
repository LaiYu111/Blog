using Blog.Common;
using Blog.IService;
using Blog.Model.Entities;
using Blog.Model.RequestModel;
using Blog.Model.Views;
using Blog.Repository.UnitOfWorks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Blog.WebAPI.Controllers
{
    /// <summary>
    /// Article Controller
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IArticleService _articleService;
        private readonly IUnitOfWorkManage _unitOfWork;
        private readonly IBaseService<Article, ArticleVo> _baseService;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="articleService"></param>
        /// <param name="unitOfWork"></param>
        /// <param name="baseService"></param>
        public ArticleController(IArticleService articleService, 
            IUnitOfWorkManage unitOfWork, 
            IBaseService<Article, ArticleVo> baseService)
        {
            _articleService = articleService;
            _unitOfWork = unitOfWork;
            _baseService = baseService;
        }

        /// <summary>
        /// 保存图片到服务器，返回路径
        /// </summary>
        /// <returns></returns>
        [HttpPost("Image")]
        public async Task<ActionResult> SaveImages([FromForm] IFormFile[] images)
        {
            if (images == null || images.Length == 0) return BadRequest("Empty Files");
            string path = AppSettings.GetImageStoragePath();
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }


            var imageIds = new List<string>();
            foreach (var image in images)
            {
                if (image.Length > 0)
                {
                    // 生成一个唯一的文件名（使用GUID以避免文件名冲突）
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);

                    // 定义文件的保存路径
                    var savePath = Path.Combine(path, fileName);

                    // 保存文件到物理路径
                    using (var stream = new FileStream(savePath, FileMode.Create))
                    {
                        await image.CopyToAsync(stream);
                    }
                    imageIds.Add(fileName);
                }
            }
            return Ok(imageIds);
        }


        /// <summary>
        /// 创建新的article
        /// </summary>
        /// <param name="article"></param>
        /// <returns></returns>
        [HttpPost("Create")]
        public async Task<ActionResult> CreateArticle([FromBody] Article article)
        {
            await Task.CompletedTask;
            return Ok(1);
        }
    }
}
