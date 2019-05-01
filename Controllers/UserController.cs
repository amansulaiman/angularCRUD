using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using angular.Data;
using angular.Models;
using angular.Services;
//using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace angular.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController: ControllerBase
    {
        private IUserService _userService;
        //private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public UserController(
            IUserService userService,
            //IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            //_mapper = mapper;
            _appSettings = appSettings.Value;
        }
        
        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]UserDto userDto)
        {
            var user = _userService.Authenticate(userDto.Username, userDto.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] 
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // return basic user info (without password) and token to store client side
            return Ok(new {
                Id = user.Id,
                Username = user.Username,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = tokenString,
                ExpireAt = token.ValidTo
            });
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody]UserDto userDto)
        {
            // map dto to entity
            var user = new User(){
                FirstName =userDto.FirstName,
                LastName = userDto.LastName,
                Username = userDto.Username
            };

            try 
            {
                // save 
                _userService.Create(user, userDto.Password);
                return Ok();
            } 
            catch(AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users =  _userService.GetAll().Select(a => new {a.LastName, a.CreatedAt, a.CreatedUser, a.FirstName, a.Id, a.Username});
            //var userDtos = _mapper.Map<IList<UserDto>>(users);
            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var user =  _userService.GetById(id);
            //var userDto = _mapper.Map<UserDto>(user);
            return Ok(new {
                user.Id, 
                user.CreatedAt, 
                user.CreatedUser,
                user.FirstName,
                user.LastName,
                user.Username
            });
        }

        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody]UserDto userDto)
        {
            // map dto to entity and set id
            //var user = _mapper.Map<User>(userDto);
            var user = new User(){
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                Username = userDto.Username
            };
            user.Id = id;

            try 
            {
                // save 
                _userService.Update(user, userDto.Password);
                return Ok();
            } 
            catch(AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            _userService.Delete(id);
            return Ok();
        }
    }
}