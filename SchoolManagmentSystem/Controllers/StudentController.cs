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
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _studentService;

        public StudentController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        
        [HttpGet]
        public async Task<ActionResult<List<StudentViewModel>>> GetAll()
        {
            var students = await _studentService.GetAllAsync();
            return Ok(students);
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentViewModel>> GetById(int id)
        {
            var student = await _studentService.GetByIdAsync(id);
            if (student == null)
                return NotFound();
            return Ok(student);
        }


        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] StudentViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _studentService.AddAsync(model);
            return Ok();
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] StudentViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != model.StudentId)
                return BadRequest("Id mismatch");

            await _studentService.UpdateAsync(model);
            return Ok();
        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _studentService.DeleteAsync(id);
            return Ok();
        }

        [HttpGet("user-dropdown")]
        public async Task<ActionResult<List<UserDto>>> GetUserDropdown()
        {
            var users = await _studentService.GetUserDropdownAsync();
            return Ok(users);
        }
       
        [HttpGet("parent-dropdown")]
        public async Task<ActionResult<List<ParentDto>>> GetParentDropdown()
        {
            var parents = await _studentService.GetParentDropdownAsync();
            return Ok(parents);
        }
    }
}
