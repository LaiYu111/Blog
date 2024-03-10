using AutoMapper;
using Blog.Common;
using Blog.Common.Caches;
using Blog.Extension;
using Blog.IService;
using Blog.Model;
using Blog.Model.Views;
using Blog.Repository.UnitOfWorks;
using Blog.Service;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;


namespace Blog.WebAPI.Controllers
{
    /// <summary>
    /// User Controller
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class UserController: ControllerBase
    {
        private readonly IBaseService<User, UserVo> _userService;
        private readonly ICaching _caching;
        private readonly IUnitOfWorkManage _unitOfWork;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="userService"></param>
        /// <param name="caching"></param>
        /// <param name="unitOfWork"></param>
        public UserController(IBaseService<User, UserVo> userService,
            ICaching caching, IUnitOfWorkManage unitOfWork)
        {
            _userService = userService;
            _caching = caching;
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// Tests
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<List<UserVo>> Get()
        {

            await _userService.Add(new User { Email="aa", Name="xx" });
            var result = await _userService.Query();
            //var result1 = AppSettings.GetValue("Redis:ConnectionString");

            //var cacheKey = "cache-key";
            //List<string> cacheKeys = await _caching.GetAllCacheKeysAsync();
            //await Console.Out.WriteLineAsync("全部keys -->" + JsonConvert.SerializeObject(cacheKeys));

            //await Console.Out.WriteLineAsync("添加一个缓存");
            //await _caching.SetStringAsync(cacheKey, "hi laozhang");
            //await Console.Out.WriteLineAsync("全部keys -->" + JsonConvert.SerializeObject(await _caching.GetAllCacheKeysAsync()));
            //await Console.Out.WriteLineAsync("当前key内容-->" + JsonConvert.SerializeObject(await _caching.GetStringAsync(cacheKey)));

            

            //await Console.Out.WriteLineAsync("删除key");
            //await _caching.RemoveAsync(cacheKey);
            //await Console.Out.WriteLineAsync("全部keys -->" + JsonConvert.SerializeObject(await _caching.GetAllCacheKeysAsync()));

            return result;
        }

        /// <summary>
        /// 测试
        /// </summary>
        /// <returns></returns>
        [HttpGet("/sss")]
        public async Task<int> GetTrans()
        {
            try
            {
                using var now = _unitOfWork.CreateUnitOfWork();
                
                await _userService.Add(new User { Email = "1", Name = "x" });

                var result = await _userService.Query();

                Console.WriteLine(result.Count());

                await _userService.Add(new User { Email = "1", Name = "xh" });

                var result1 = await _userService.Query();

                Console.WriteLine(result1.Count());

                int ex = 0;
                Console.WriteLine($"There's an exception!!");
                Console.WriteLine($" ");
                int throwEx = 1 / ex;

                now.Commit();
                
            }
            catch (Exception ex)
            {
                var result = await _userService.Query();
                Console.WriteLine(result.Count());
            }
            return 11;
        }
    }
}
