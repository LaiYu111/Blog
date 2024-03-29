﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Model.RequestModels
{
    public class ArticleRequest
    {
        public required string Title { get; set; }
        public required string Content { get; set; }
        public required string Description {  get; set; }
        public string CoverImage {  get; set; } = string.Empty;
        public DateTime UpdateTime { get; set; } = DateTime.Now;
    }
}
