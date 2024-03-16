using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Model.Entities
{
    public class Role: RootEntityTkey<int>
    {
        public string RoleName {  get; set; }

        public List<User> Users { get; set; }
    }
}
