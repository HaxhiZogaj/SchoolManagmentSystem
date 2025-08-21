using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolManagmentSystem.Models;
using System;
using System.Linq;
using System.Threading.Tasks;
using static SchoolManagmentSystem.DTOs.UserDto;

namespace SchoolManagmentSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly SchoolMSContext _context;

        public UsersController(SchoolMSContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (_context.Users.Any(u => u.Email == request.Email))
                return BadRequest(new { message = "Email already exists." });

            var hash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            var user = new User
            {
                Username = request.Username,
                Email = request.Email,
                PasswordHash = hash,
                Role = request.Role ?? "Student",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User registered successfully", role = user.Role });
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null)
                return Unauthorized(new { message = "User not found." });

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                return Unauthorized(new { message = "Invalid password." });

            var token = Guid.NewGuid().ToString();
            return Ok(new
            {
                message = "Login successful",
                token,
                userId = user.UserId,
                username = user.Username,
                role = user.Role
            });
        }
    }
}

//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using SchoolManagmentSystem.Models;
//using System;
//using System.Linq;
//using System.Threading.Tasks;
//using Microsoft.IdentityModel.Tokens;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;
//using System.ComponentModel.DataAnnotations;
//using static SchoolManagmentSystem.DTOs.UserDto;

//namespace SchoolManagmentSystem.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class UsersController : ControllerBase
//    {
//        private readonly SchoolMSContext _context;
//        private readonly IConfiguration _configuration;

//        public UsersController(SchoolMSContext context, IConfiguration configuration)
//        {
//            _context = context;
//            _configuration = configuration;
//        }

//        [Authorize(Roles = "Admin")]
//        [HttpGet]
//        public async Task<IActionResult> GetAllUsers()
//        {
//            var users = await _context.Users
//                .Select(u => new UserResponse
//                {
//                    UserId = u.UserId,
//                    Username = u.Username,
//                    Email = u.Email,
//                    Role = u.Role,
//                    CreatedAt = u.CreatedAt ?? DateTime.UtcNow,
//                    UpdatedAt = u.UpdatedAt ??  DateTime.UtcNow
//                })
//                .ToListAsync();
//            return Ok(users);
//        }

//        [HttpPost("register")]
//        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
//        {
//            if (!ModelState.IsValid)
//                return BadRequest(ModelState);

//            if (_context.Users.Any(u => u.Email == request.Email))
//                return BadRequest(new { message = "Email already exists." });

//            var hash = BCrypt.Net.BCrypt.HashPassword(request.Password);

//            var user = new User
//            {
//                Username = request.Username,
//                Email = request.Email,
//                PasswordHash = hash,
//                Role = request.Role ?? "Student",
//                CreatedAt = DateTime.UtcNow,
//                UpdatedAt = DateTime.UtcNow
//            };

//            _context.Users.Add(user);
//            await _context.SaveChangesAsync();

//            return Ok(new { message = "User registered successfully", role = user.Role });
//        }

//        [HttpPost("login")]
//        public async Task<IActionResult> Login([FromBody] LoginRequest request)
//        {
//            if (!ModelState.IsValid)
//                return BadRequest(ModelState);

//            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
//            if (user == null)
//                return Unauthorized(new { message = "User not found." });

//            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
//                return Unauthorized(new { message = "Invalid password." });

//            var token = GenerateJwtToken(user);

//            return Ok(new
//            {
//                message = "Login successful",
//                token,
//                userId = user.UserId,
//                username = user.Username,
//                role = user.Role
//            });
//        }

//        private string GenerateJwtToken(User user)
//        {
//            var claims = new[]
//            {
//                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
//                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
//                new Claim(ClaimTypes.Name, user.Username),
//                new Claim(ClaimTypes.Role, user.Role ?? "Student")
//            };

//            var key = new SymmetricSecurityKey(
//                Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
//            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

//            var token = new JwtSecurityToken(
//                issuer: _configuration["Jwt:Issuer"],
//                audience: _configuration["Jwt:Audience"],
//                claims: claims,
//                expires: DateTime.Now.AddHours(1),
//                signingCredentials: creds);

//            return new JwtSecurityTokenHandler().WriteToken(token);
//        }
//    }
//}
