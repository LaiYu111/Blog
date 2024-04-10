using Blog.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Common
{
    public static class PolicyNames
    {
        public const string Admin = nameof(RoleEnum.Admin);
        public const string Guest = nameof(RoleEnum.Guest);
    }
}