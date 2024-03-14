using SqlSugar;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Model.Entities
{
    [SugarTable("Article")]
    public class Article : RootEntityTkey<long>
    {
        /// <summary>
        /// 文章标题
        /// </summary>
        [SugarColumn(IsNullable = false, Length = 100)]
        public string Title { get; set; } = "";
        /// <summary>
        /// 文章作者外键
        /// </summary>
        public long AuthorId { get; set; }
        /// <summary>
        /// 作者
        /// </summary>
        [ForeignKey(nameof(AuthorId))]
        public User User { get; set; }
        /// <summary>
        /// 文章内容
        /// </summary>
        [SugarColumn(IsNullable = false)]
        public string Content { get; set; } = "";

    }
}
