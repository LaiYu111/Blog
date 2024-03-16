using Blog.Common.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Blog.Model.Entities
{
    public class User : RootEntityTkey<long>
    {
        public string Name { get; set; }
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; }
        public int RoleId { set; get; }
        public long UserDetailId { set; get; }
        
        public UserDetail UserDetail { get; set; } = new UserDetail();
        public Role Role { get; set; } = new Role() { RoleName = RoleEnum.Guest.ToString() };
    }

}
