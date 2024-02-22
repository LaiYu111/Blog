using AutoMapper;
using Blog.IService;
using Blog.Model;
using Blog.Repository;
using Blog.Repository.Base;

namespace Blog.Service
{
    public class UserService : BaseService<User,UserVo>, IUserService
    {
        public UserService(IMapper mapper, IBaseRepository<User> baseRepository) : base(mapper, baseRepository)
        {
        }

    }
}
