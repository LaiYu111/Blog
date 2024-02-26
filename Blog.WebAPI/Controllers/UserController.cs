using AutoMapper;
using Blog.Common;
using Blog.Common.Caches;
using Blog.Extension;
using Blog.IService;
using Blog.Model;
using Blog.Service;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Blog.WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController: ControllerBase
    {
        private readonly IBaseService<User, UserVo> _userService;
        private readonly ICaching _caching;

        public UserController(IBaseService<User, UserVo> userService,
            ICaching caching)
        {
            _userService = userService;
            _caching = caching;
        }
        [HttpGet]
        public async Task<List<UserVo>> Get()
        {
            var result = await _userService.Query();
            var result1 = AppSettings.GetValue("Redis:ConnectionString");

            var cacheKey = "cache-key";
            List<string> cacheKeys = await _caching.GetAllCacheKeysAsync();
            await Console.Out.WriteLineAsync("全部keys -->" + JsonConvert.SerializeObject(cacheKeys));

            await Console.Out.WriteLineAsync("添加一个缓存");
            await _caching.SetStringAsync(cacheKey, "hi laozhang");
            await Console.Out.WriteLineAsync("全部keys -->" + JsonConvert.SerializeObject(await _caching.GetAllCacheKeysAsync()));
            await Console.Out.WriteLineAsync("当前key内容-->" + JsonConvert.SerializeObject(await _caching.GetStringAsync(cacheKey)));

            //await Console.Out.WriteLineAsync("删除key");
            //await _caching.RemoveAsync(cacheKey);
            //await Console.Out.WriteLineAsync("全部keys -->" + JsonConvert.SerializeObject(await _caching.GetAllCacheKeysAsync()));

            return result;
        }
    }
}
