using AutoMapper;
using Blog.Model;

namespace Blog.Extension
{
    public class CustomProfile : Profile
    {
        public CustomProfile()
        {
            CreateMap<Role, RoleVo>()
                .ForMember(roleVo => roleVo.RoleName, origin => origin.MapFrom(role => role.Name));
            CreateMap<RoleVo, Role>()
                .ForMember(role => role.Name, origin => origin.MapFrom(roleVo => roleVo.RoleName));

            CreateMap<User, UserVo>()
                .ForMember(userVo => userVo.UserName, origin => origin.MapFrom(user => user.Name))
                .ForMember(userVo => userVo.UserEmail, origin => origin.MapFrom(user => user.Email));
        }
    }
}
