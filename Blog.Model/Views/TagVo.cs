using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Model.Views
{
    public class TagVo
    {
        public long Id { get; set; }
        public string TagName { get; set; }
        public string Color { get; set; }
        public DateTime CreateTime { get; set; }
    }
}
