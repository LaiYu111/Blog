using Blog.Model.Entities;
using Blog.Repository.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Repository
{
    public interface IUserRepository : IBaseRepository<User>
    {
        Task<User> Register(User user);
    }
}
