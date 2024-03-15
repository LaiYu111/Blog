using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Model.Entities
{
    public class Article : RootEntityTkey<long>
    {
        public string Title { get; set; } = string.Empty;
        public int Likes { get; set; } = 0;
        public string Description { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;

        public ICollection<Tag> Tags { get; set; }
    }
}
