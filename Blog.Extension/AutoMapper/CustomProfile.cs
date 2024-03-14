using AutoMapper;
using Blog.Model;
using Blog.Model.Entities;
using Blog.Model.Views;

namespace Blog.Extension.AutoMapper
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

            CreateMap<Article, ArticleVo>()
                .ForMember(articleVo => articleVo.ArticleId, origin => origin.MapFrom(article => article.Id))
                .ForMember(articleVo => articleVo.ArticleTitle, origin => origin.MapFrom(article => article.Title))
                .ForMember(articleVo => articleVo.ArticleContent, origin => origin.MapFrom(article => article.Content))
                .ForMember(articleVo => articleVo.ArticleAuthor, origin => origin.MapFrom(article => article.AuthorId))
                .ForMember(articleVo => articleVo.ArticleCreateTime, origin => origin.MapFrom(article => article.CreateTime));
        }
    }
}
