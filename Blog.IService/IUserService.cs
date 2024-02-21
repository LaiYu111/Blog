using Blog.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.IService
{
    public interface IUserService : IBaseService<User, UserVo>
    {
        Task<List<UserVo>> Query();
    }
}
