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

        public async Task<List<UserVo>> Query()
        {
            var userRepo = new UserRepository();
            var users = await userRepo.Query();
            return users.Select(d => new UserVo() {  UserName = d.Name}).ToList(); 
        }
    }
}
