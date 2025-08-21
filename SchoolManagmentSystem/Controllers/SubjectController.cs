using Microsoft.AspNetCore.Mvc;
using SchoolManagmentSystem.Interfaces;
using SchoolManagmentSystem.ViewModels;
using SchoolManagmentSystem.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SchoolManagmentSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectController : ControllerBase
    {
        private readonly ISubjectService _subjectService;

        public SubjectController(ISubjectService subjectService)
        {
            _subjectService = subjectService;
        }

        
        [HttpGet]
        public async Task<ActionResult<List<SubjectViewModel>>> GetAll()
        {
            var subjects = await _subjectService.GetAllAsync();
            return Ok(subjects);
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<SubjectViewModel>> GetById(int id)
        {
            var subject = await _subjectService.GetByIdAsync(id);
            if (subject == null)
                return NotFound();
            return Ok(subject);
        }

        
        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] SubjectViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _subjectService.AddAsync(model);
            return Ok();
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] SubjectViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != model.SubjectId)
                return BadRequest("Subject ID mismatch");

            await _subjectService.UpdateAsync(model);
            return Ok();
        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _subjectService.DeleteAsync(id);
            return Ok();
        }

        
        [HttpGet("department-dropdown")]
        public async Task<ActionResult<List<DepartmentDto>>> GetDepartmentDropdown()
        {
            var departments = await _subjectService.GetDepartmentDropdownAsync();
            return Ok(departments);
        }
    }
}
