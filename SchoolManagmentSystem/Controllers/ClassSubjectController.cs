using Microsoft.AspNetCore.Mvc;
using SchoolManagmentSystem.Interfaces;
using SchoolManagmentSystem.ViewModels;
using System.Threading.Tasks;

namespace SchoolManagmentSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassSubjectController : ControllerBase
    {
        private readonly IClassSubjectService _service;

        public ClassSubjectController(IClassSubjectService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var items = await _service.GetAllAsync();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var item = await _service.GetByIdAsync(id);
            if (item == null)
                return NotFound();

            return Ok(item);
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] ClassSubjectViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _service.AddAsync(model);
                return Ok();
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ClassSubjectViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != model.ClassSubjectId)
                return BadRequest("Id in URL does not match model.");

            try
            {
                await _service.UpdateAsync(model);
                return Ok();
            }
            catch (System.Collections.Generic.KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _service.DeleteAsync(id);
                return Ok();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Gabim i brendshëm në server.");
            }
        }

        [HttpGet("dropdown/classes")]
        public async Task<IActionResult> GetClassesDropdown()
        {
            var classes = await _service.GetClassesDropdownAsync();
            return Ok(classes);
        }

        [HttpGet("dropdown/subjects")]
        public async Task<IActionResult> GetSubjectsDropdown()
        {
            var subjects = await _service.GetSubjectsDropdownAsync();
            return Ok(subjects);
        }

        [HttpGet("dropdown/teachers")]
        public async Task<IActionResult> GetTeachersDropdown()
        {
            var teachers = await _service.GetTeachersDropdownAsync();
            return Ok(teachers);
        }
    }
}
