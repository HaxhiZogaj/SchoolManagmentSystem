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
    public class TimetableController : ControllerBase
    {
        private readonly ITimetableService _timetableService;

        public TimetableController(ITimetableService timetableService)
        {
            _timetableService = timetableService;
        }

        
        [HttpGet]
        public async Task<ActionResult<List<TimetableViewModel>>> GetAll()
        {
            var list = await _timetableService.GetAllAsync();
            return Ok(list);
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<TimetableViewModel>> GetById(int id)
        {
            var item = await _timetableService.GetByIdAsync(id);
            if (item == null)
                return NotFound();
            return Ok(item);
        }


        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] TimetableViewModel vm)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _timetableService.AddAsync(vm);
            return Ok();
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] TimetableViewModel vm)
        {
            if (id != vm.TimetableId)
                return BadRequest("ID mismatch");

            await _timetableService.UpdateAsync(vm);
            return Ok();
        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _timetableService.DeleteAsync(id);
            return Ok();
        }

        
        [HttpGet("classsubject-dropdown")]
        public async Task<ActionResult<List<ClassSubjectDto>>> GetClassSubjectDropdown()
        {
            var data = await _timetableService.GetClassSubjectDropdownAsync();
            return Ok(data);
        }
    }
}
