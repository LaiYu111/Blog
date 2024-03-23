using AutoMapper;
using Blog.Model.Entities;
using Blog.Model.RequestModels;
using Blog.Model.Views;
using Blog.Service;
using Microsoft.AspNetCore.Mvc;

namespace Blog.WebAPI.Controllers
{
    /// <summary>
    /// User Controller
    /// </summary>
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UserController:ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserService _userService;

        /// <summary>
        /// Constructor
        /// </summary>
        public UserController(IMapper mapper,
                              IUserService userService)
        {
            _mapper = mapper;
            _userService = userService;
        }

        /// <summary>
        /// Resigter an account
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult> Register([FromBody] UserRequest user)
        {
            var result = await _userService.Register(_mapper.Map<User>(user));
            return Ok(result);
        }

        /// <summary>
        /// Login 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult> Login([FromBody] UserRequest user)
        {
            var token = await _userService.Login(user.UserName, user.Password);
            if (token == null) { return Unauthorized(); }
            return Ok(token);
        }

        /// <summary>
        /// Return all user information
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult> GetUserInfo(long id)
        {
            var user = await _userService.GetAllUserInfo(id);
            return Ok(user);
        }
    }
}
