using Blog.Model;
using Blog.Model.Entities;
using Blog.Repository.Base;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Repository
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(BlogDBContext dbContext) : base(dbContext)
        {
        }

        public async Task<User> Register(User user)
        {
            var guest = await _dbContext.Roles.FirstOrDefaultAsync(x => x.RoleName == "Guest");
            if (guest != null)
            {
                
                user.Role = guest;
            }
            return await base.AddAsync(user);
        }
    }
}
