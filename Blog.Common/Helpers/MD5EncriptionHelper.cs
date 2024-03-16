using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Common.Helpers
{
    public static class MD5EncriptionHelper
    {
        public static string Encrypt(string input)
        {
            using (MD5 md5 = MD5.Create())
            {
                byte[] dataBytes = Encoding.UTF8.GetBytes(input);

                // 计算MD5哈希值
                byte[] md5HashBytes = md5.ComputeHash(dataBytes);

                // 将MD5哈希值转换为十六进制字符串
                string md5HashString = BitConverter.ToString(md5HashBytes).Replace("-", "").ToLower();

                return md5HashString;
            }
        }
    }
}
