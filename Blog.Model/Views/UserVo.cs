using Blog.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Model.Views
{
    public class UserVo
    {
        public string UserName {  get; set; }
        public string UserEmail { get; set; }
        public string CreateTime { get; set; }
        public UserDetailVo UserDetail { get; set; }
        public RoleVo Role { get; set; }
    }
}
