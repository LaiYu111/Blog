using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Model.Entities
{
    public class ArticleTag
    {
        public long ArticlesId { get; set; }
        public Article Article { get; set; }
        public long TagsId { get; set; }
        public Tag Tag { get; set; }
    }
}
