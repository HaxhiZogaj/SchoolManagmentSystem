using Microsoft.AspNetCore.Mvc;
using SchoolManagmentSystem.ViewModels;
using SchoolManagmentSystem.DTOs;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace SchoolManagmentSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnrollmentController : ControllerBase
    {
        private readonly IEnrollmentService _service;

        public EnrollmentController(IEnrollmentService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<EnrollmentViewModel>>> GetAll()
        {
            var enrollments = await _service.GetAllAsync();
            return Ok(enrollments);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EnrollmentViewModel>> GetById(int id)
        {
            var enrollment = await _service.GetByIdAsync(id);
            if (enrollment == null) return NotFound();
            return Ok(enrollment);
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] EnrollmentViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            await _service.AddAsync(model);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] EnrollmentViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (id != model.EnrollmentId) return BadRequest("Id mismatch");

            await _service.UpdateAsync(model);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return Ok();
        }

        

        [HttpGet("students-dropdown")]
        public async Task<ActionResult<List<StudentDto>>> GetStudentsDropdown()
        {
            var students = await _service.GetStudentsDropdownAsync();
            return Ok(students);
        }

        [HttpGet("classes-dropdown")]
        public async Task<ActionResult<List<ClassDto>>> GetClassesDropdown()
        {
            var classes = await _service.GetClassesDropdownAsync();
            return Ok(classes);
        }
    }
}
