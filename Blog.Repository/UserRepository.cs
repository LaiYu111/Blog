using Blog.Model;
using Blog.Repository.Base;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Repository
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
    }
}
