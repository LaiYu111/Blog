using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Model.Entities
{
    public class Tag : RootEntityTkey<long>
    {
        public string TagName { get; set; }
        public string Color { get; set; }

        public List<ArticleTag> ArticleTags { get; set; }
    }
}
