using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Common
{
    public static class UtilConvert
    {
        /// <summary>
        /// 将对象转换为字符串表示形式，并去除开头和结尾的空白字符。
        /// null 值返回空字符串。
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static string ObjToString(this object obj)
        {
            if (obj != null) return obj.ToString().Trim();
            return "";
        }
    }
}
