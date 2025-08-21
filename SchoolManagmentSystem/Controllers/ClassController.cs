using Microsoft.AspNetCore.Mvc;
using SchoolManagmentSystem.Interfaces;
using SchoolManagmentSystem.ViewModels;
using System.Threading.Tasks;

namespace SchoolManagmentSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassController : ControllerBase
    {
        private readonly IClassService _service;

        public ClassController(IClassService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var classes = await _service.GetAllAsync();
            return Ok(classes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var @class = await _service.GetByIdAsync(id);
            if (@class == null)
                return NotFound();

            return Ok(@class);
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] ClassViewModel model)
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
        public async Task<IActionResult> Update(int id, [FromBody] ClassViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != model.ClassId)
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
                // Specific error like: "Nuk mund të fshihet kjo klasë sepse ka studentë të regjistruar."
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Gabim i brendshëm në server.");
            }
        }


        [HttpGet("dropdown/teachers")]
        public async Task<IActionResult> GetTeachersDropdown()
        {
            var teachers = await _service.GetTeacherDropdownAsync();
            return Ok(teachers);
        }
    }
}
