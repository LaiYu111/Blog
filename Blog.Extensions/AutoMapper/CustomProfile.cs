using AutoMapper;
using Blog.Common.Helpers;
using Blog.Model.Entities;
using Blog.Model.RequestModels;
using Blog.Model.Views;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Extensions.AutoMapper
{
    public class CustomProfile : Profile
    {
        public CustomProfile()
        {
            // Article <--> ArticleVo
            CreateMap<ArticleRequest, Article>()
                 .ForMember(article => article.Content, origin => origin.MapFrom(articleReq => articleReq.Content))
                 .ForMember(article => article.Title, origin => origin.MapFrom(articleReq => articleReq.Title))
                 .ForMember(article => article.CoverImage, origin => origin.MapFrom(articleReq => articleReq.CoverImage))
                 .ForMember(article => article.Description, origin => origin.MapFrom(articleReq => articleReq.Description));

            CreateMap<Article, ArticleVo>()
                 .ForMember(articleVo => articleVo.ArticleId, origin => origin.MapFrom(article => article.Id))
                 .ForMember(articleVo => articleVo.ArticleTitle, origin => origin.MapFrom(article => article.Title))
                 .ForMember(articleVo => articleVo.ArticleLikes, origin => origin.MapFrom(article => article.Likes))
                 .ForMember(articleVo => articleVo.ArticleCoverImage, origin => origin.MapFrom(article => article.CoverImage))
                 .ForMember(articleVo => articleVo.ArticleDescription, origin => origin.MapFrom(article => article.Description))
                 .ForMember(articleVo => articleVo.ArticleCreateTime, origin => origin.MapFrom(article => article.CreateTime))
                 .ForMember(articleVo => articleVo.ArticleContent, origin => origin.MapFrom(article => article.Content));

            // UserDetail <--> UserDetailVo
            CreateMap<UserDetail, UserDetailVo>()
                .ForMember(userDetailVo => userDetailVo.Description, origin => origin.MapFrom((userDetail) => userDetail.Description))
                .ForMember(userDetailVo => userDetailVo.Others, origin => origin.MapFrom((userDetail) => userDetail.Others))
                .ForMember(userDetailVo => userDetailVo.GitHub, origin => origin.MapFrom((userDetail) => userDetail.GitHub))
                .ForMember(userDetailVo => userDetailVo.LinkedIn, origin => origin.MapFrom((userDetail) => userDetail.LinkedIn));


            // Role <--> RoleVo
            CreateMap<Role, RoleVo>()
                .ForMember(roleVo => roleVo.RoleName, origin => origin.MapFrom((role) => role.RoleName));


            // User <--> UserVo
            CreateMap<User, UserVo>()
                .ForMember(userVo => userVo.UserName, origin => origin.MapFrom(user => user.Name))
                .ForMember(userVo => userVo.UserEmail, origin => origin.MapFrom(user => user.Email))
                .ForMember(userVo => userVo.Role, origin => origin.MapFrom(user => user.Role))
                .ForMember(userVo => userVo.UserDetail, origin => origin.MapFrom(user => user.UserDetail))
                .ForMember(userVo => userVo.CreateTime, origin => origin.MapFrom(user => user.CreateTime));

            CreateMap<UserRequest, User>()
                .ForMember(user => user.Name, origin => origin.MapFrom(userReq => userReq.UserName))
                .AfterMap((userReq, user) => {
                    // 在这里调用加密方法，并将结果赋给user.PasswordHash
                    user.PasswordHash = MD5EncriptionHelper.Encrypt(userReq.Password);
                });
        }
    }
}
