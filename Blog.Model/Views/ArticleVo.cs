using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Model.Views
{
    public class ArticleVo
    {
        public long ArticleId { get; set; }
        public string ArticleTitle { get; set; }
        public string ArticleContent { get; set; }
        public string ArticleAuthor { get; set; }
        public DateTime ArticleCreateTime { get; set; }
    }
}
