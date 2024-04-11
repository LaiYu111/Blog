using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Model.RequestModels
{
    public class TagRequest
    {
        public long Id {  get; set; }
        public string TagName { get; set; }
        public string Color { get; set; }
    }
}
