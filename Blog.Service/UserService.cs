using AutoMapper;
using Blog.Common;
using Blog.Common.Helpers;
using Blog.IService;
using Blog.Model;
using Blog.Model.Entities;
using Blog.Model.Views;
using Blog.Repository;
using Blog.Repository.Base;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Service
{
    public class UserService : BaseService<User, UserVo>, IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IBaseRepository<UserDetail> _userDetailRepository;
        private readonly IBaseRepository<Role> _roleRepository;

        public UserService(IMapper mapper, 
            IBaseRepository<User> baseRepository,
            IBaseRepository<UserDetail> userDetailRepository,
            IBaseRepository<Role> roleRepository,
            IUserRepository userRepository
            ) : base(mapper, baseRepository)
        {
            _userRepository = userRepository;
            _userDetailRepository = userDetailRepository;
            _roleRepository = roleRepository;
        }

        /// <summary>
        /// 创建 Token, 用 HmacSha512Signature 加密凭证
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public string CreateToken(User user)
        {
            if (AppSettings.GetJwtSettings == null) throw new Exception("no JwtSettings");

            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role.RoleName),
                new Claim(ClaimTypes.Hash, user.PasswordHash),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                AppSettings.GetJwtSettings().Key));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds,
                audience: AppSettings.GetJwtSettings().Audience,
                issuer: AppSettings.GetJwtSettings().Issuer
                );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }

        public async Task<string?> Login(string username, string password)
        {
            User? user;
            string encriptedPwd = MD5EncriptionHelper.Encrypt(password);
            if (EmailValidationHelper.isEmail(username) == true)
            {
                 user = await _baseRepository.FindAsync(x => x.Email == username);
            }
            else
            {
                user = await _baseRepository.FindAsync(x => x.Name.Equals(username));
            }

            if (user == null) { return null; }
            if (user.PasswordHash == encriptedPwd) { return CreateToken(user); }
            return null;
        }

        public async Task<UserVo> Register(User user)
        {
            var result = await _userRepository.Register(user);
            return _mapper.Map<UserVo>(result);
        }

        public async Task<UserVo> GetAllUserInfo(long id)
        {
            var user = await _baseRepository.FindByIdAsync(id);
            var role = await _roleRepository.FindByIdAsync(user.RoleId);
            var userDetail = await _userDetailRepository.FindByIdAsync(user.UserDetailId);

            user.UserDetail = userDetail;
            user.Role = role;

            return _mapper.Map<UserVo>(user);
        }
    }
}
