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

            CreateMap<User, UserVo>()
                .ForMember(userVo => userVo.UserName, origin => origin.MapFrom(user => user.Name));

            CreateMap<UserRequest, User>()
                .ForMember(user => user.Name, origin => origin.MapFrom(userReq => userReq.UserName))
                .AfterMap((userReq, user) => {
                    // 在这里调用加密方法，并将结果赋给user.PasswordHash
                    user.PasswordHash = MD5EncriptionHelper.Encrypt(userReq.Password);
                });
        }
    }
}
