using Microsoft.AspNetCore.Mvc;
using SchoolManagmentSystem.ViewModels;
using SchoolManagmentSystem.DTOs;
using SchoolManagmentSystem.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SchoolManagmentSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GradeController : ControllerBase
    {
        private readonly IGradeService _service;

        public GradeController(IGradeService service)
        {
            _service = service;
        }

       
        [HttpGet]
        public async Task<ActionResult<List<GradeViewModel>>> GetAll()
        {
            var grades = await _service.GetAllAsync();
            return Ok(grades);
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<GradeViewModel>> GetById(int id)
        {
            var grade = await _service.GetByIdAsync(id);
            if (grade == null)
                return NotFound();
            return Ok(grade);
        }

        
        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] GradeViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _service.AddAsync(model);
            return Ok();
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] GradeViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != model.GradeId)
                return BadRequest("Id mismatch");

            await _service.UpdateAsync(model);
            return Ok();
        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return Ok();
        }

        
        [HttpGet("enrollment-dropdown")]
        public async Task<ActionResult<List<EnrollmentDto>>> GetEnrollmentDropdown()
        {
            var enrollments = await _service.GetEnrollmentDropdownAsync();
            return Ok(enrollments);
        }

        
        [HttpGet("classsubject-dropdown")]
        public async Task<ActionResult<List<ClassSubjectDto>>> GetClassSubjectDropdown()
        {
            var classSubjects = await _service.GetClassSubjectDropdownAsync();
            return Ok(classSubjects);
        }
    }
}
