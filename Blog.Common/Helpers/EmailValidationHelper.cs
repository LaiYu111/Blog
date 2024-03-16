using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Blog.Common.Helpers
{
    public static class EmailValidationHelper
    {
        public static bool isEmail(string input)
        {
            if (string.IsNullOrEmpty(input)) return false;

            // 正则表达式模式，用于匹配电子邮件地址
            string pattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";

            // 使用正则表达式进行匹配
            bool isMatch = Regex.IsMatch(input, pattern, RegexOptions.IgnoreCase);

            return isMatch;
        }
    }
}
