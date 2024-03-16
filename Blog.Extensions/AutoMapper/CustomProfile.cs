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
                 .ForMember(article => article.Description, origin => origin.MapFrom(articleReq => articleReq.Description));

            CreateMap<Article, ArticleVo>()
                 .ForMember(articleVo => articleVo.ArticleId, origin => origin.MapFrom(article => article.Id));

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
