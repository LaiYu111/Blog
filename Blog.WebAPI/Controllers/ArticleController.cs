using Blog.Common;
using Blog.IService;
using Blog.Model.RequestModel;
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

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="articleService"></param>
        /// <param name="unitOfWork"></param>
        public ArticleController(IArticleService articleService, IUnitOfWorkManage unitOfWork)
        {
            _articleService = articleService;
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// 保存图片到服务器，返回路径
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult> SaveImages([FromForm] IFormFile[] images)
        {
            if (images == null || images.Length == 0) return BadRequest("Empty Files");
            string path = AppSettings.GetImageStoragePath();
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }


            var urls = new List<string>();
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

                    // 生成文件的URL（假设 "images" 文件夹已配置为静态文件）
                    var url = $"{Request.Scheme}://{Request.Host}/images/{fileName}";
                    urls.Add(url);
                }
            }


            return Ok(urls);
        }
    }
}
