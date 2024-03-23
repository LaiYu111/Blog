using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Model.Views
{
    public class UserDetailVo
    {
        public string LinkedIn { get; set; } = string.Empty;
        public string GitHub { get; set; } = string.Empty;
        public string Description { set; get; } = string.Empty;
        public string Others { set; get; } = string.Empty;
    }
}
