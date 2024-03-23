using Blog.IService;
using Blog.Model.Entities;
using Blog.Model.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Service
{
    public interface IUserService : IBaseService<User, UserVo>
    {
        Task<string?> Login(string username, string password);
        Task<UserVo> Register(User user);
        Task<UserVo> GetAllUserInfo(long id);
    }
}
