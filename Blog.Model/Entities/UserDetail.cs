using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Model.Entities
{
    public class UserDetail: RootEntityTkey<long>
    {
        public User User { get; set; }
        public string Description { get; set; } = string.Empty;
        public string LinkedIn { get; set; } = string.Empty;
        public string GitHub { get; set; } = string.Empty;
        public string Others { set; get; } = string.Empty;
    }
}
