using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolManagmentSystem.Models;
using SchoolManagmentSystem.Services.Interfaces;
using System.Security.Claims;

namespace SchoolManagmentSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IStudentProfileService _profileService;


        public ProfileController(IStudentProfileService profileService)
        {
            _profileService = profileService;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetStudentProfile(int userId)
        {
            try
            {
                var profile = await _profileService.GetStudentProfileAsync(userId);
                if (profile == null)
                    return NotFound();
                return Ok(profile);
            }
            catch (Exception ex)
            {
                // Log the exception (use a real logger in your project)
                Console.WriteLine(ex);
                // Return details in response (only for debugging!)
                return StatusCode(500, new { error = ex.Message, stackTrace = ex.StackTrace });
            }
        }









    }

}
