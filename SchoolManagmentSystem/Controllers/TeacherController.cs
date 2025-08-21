using Microsoft.AspNetCore.Mvc;
using SchoolManagmentSystem.Services.Interfaces;
using SchoolManagmentSystem.ViewModels;
using SchoolManagmentSystem.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SchoolManagmentSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly ITeacherService _teacherService;

        public TeacherController(ITeacherService teacherService)
        {
            _teacherService = teacherService;
        }

       
        [HttpGet]
        public async Task<ActionResult<List<TeacherViewModel>>> GetAll()
        {
            var teachers = await _teacherService.GetAllAsync();
            return Ok(teachers);
        }

       
        [HttpGet("{id}")]
        public async Task<ActionResult<TeacherViewModel>> GetById(int id)
        {
            var teacher = await _teacherService.GetByIdAsync(id);
            if (teacher == null)
                return NotFound();
            return Ok(teacher);
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] TeacherViewModel viewModel)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _teacherService.AddAsync(viewModel);
            return Ok();
        }

      
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] TeacherViewModel viewModel)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != viewModel.TeacherId)
                return BadRequest("ID mismatch");

            await _teacherService.UpdateAsync(viewModel);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _teacherService.DeleteAsync(id);
            return Ok();
        }

        [HttpGet("user-dropdown")]
        public async Task<ActionResult<List<UserDto>>> GetUserDropdown()
        {
            var users = await _teacherService.GetUserDropdownAsync();
            return Ok(users);
        }

        [HttpGet("department-dropdown")]
        public async Task<ActionResult<List<DepartmentDto>>> GetDepartmentDropdown()
        {
            var departments = await _teacherService.GetDepartmentDropdownAsync();
            return Ok(departments);
        }
    }
}
