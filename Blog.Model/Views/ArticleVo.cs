using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Model.Views
{
    public class ArticleVo
    {
        public long ArticleId {  get; set; }
        public int ArticleLikes { get; set; } 
        public string ArticleDescription { get; set; }
        public string ArticleContent { get; set; } 
        public string ArticleCoverImage { get; set; } 
        public string ArticleTitle { get; set; }
        public DateTime ArticleCreateTime { get; set; }
        public DateTime ArticleUpdateTime { get; set; }
        public List<TagVo> Tags { get; set; } = new List<TagVo>();
    }
}
