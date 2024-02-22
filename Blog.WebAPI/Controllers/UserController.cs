﻿using AutoMapper;
using Blog.Common;
using Blog.IService;
using Blog.Model;
using Blog.Service;
using Microsoft.AspNetCore.Mvc;

namespace Blog.WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController: ControllerBase
    {
        private readonly IBaseService<User, UserVo> _userService;
        public UserController(IBaseService<User, UserVo> userService)
        {
            _userService = userService;
        }
        [HttpGet]
        public async Task<List<UserVo>> Get()
        {
            var result = await _userService.Query();
            var result1 = AppSettings.GetValue("Redis:ConnectionString");
            Console.WriteLine(result1);
            
            return result;
        }
    }
}
