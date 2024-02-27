using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Model
{
    public class User: RootEntityTkey<long>
    {
        public string Name { get; set; } = "abc";
        public string Email { get; set; } = "abc";
    }
}
