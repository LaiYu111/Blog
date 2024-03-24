using Blog.Common;
using Blog.Common.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Blog.WebAPI.Controllers
{
    /// <summary>
    /// System
    /// </summary>
    [Authorize(Roles = $"{PolicyNames.Guest},{PolicyNames.Admin}")]
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class SystemController : ControllerBase
    {
        /// <summary>
        /// Constructure
        /// </summary>
        public SystemController(){}

        /// <summary>
        /// Version
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> Version()
        {
            await Task.CompletedTask;
            Console.WriteLine(PolicyNames.Admin);
            Console.WriteLine(PolicyNames.Guest);
            return Ok(1);
        }
    }
}
