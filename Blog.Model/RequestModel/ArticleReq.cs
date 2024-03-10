using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Model.RequestModel
{
    /// <summary>
    /// 接受前端的请求模型
    /// </summary>
    public class ArticleReq
    {
        public required string Text { get; set; }
        public List<IFormFile?> Images { get; set; } = new List<IFormFile?>();
    } 
}
