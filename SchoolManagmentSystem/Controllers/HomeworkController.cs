using Microsoft.AspNetCore.Mvc;
using SchoolManagmentSystem.Services.Interfaces;
using SchoolManagmentSystem.ViewModels;

namespace SchoolManagmentSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeworkController : ControllerBase
    {
        private readonly IHomeworkService _homeworkService;

        public HomeworkController(IHomeworkService homeworkService)
        {
            _homeworkService = homeworkService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<HomeworkViewModel>>> GetAll()
        {
            var homeworks = await _homeworkService.GetAllAsync();
            return Ok(homeworks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HomeworkViewModel>> GetById(int id)
        {
            var homework = await _homeworkService.GetByIdAsync(id);
            if (homework == null)
                return NotFound();

            return Ok(homework);
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] HomeworkViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _homeworkService.AddAsync(model);
            return Ok(new { message = "Homework created successfully" });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] HomeworkViewModel model)
        {
            if (id != model.HomeworkId)
                return BadRequest("ID mismatch");

            await _homeworkService.UpdateAsync(model);
            return Ok(new { message = "Homework updated successfully" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _homeworkService.DeleteAsync(id);
            return Ok(new { message = "Homework deleted successfully" });
        }

        [HttpGet("classsubject-dropdown")]
        public async Task<IActionResult> GetClassSubjectDropdown()
        {
            var data = await _homeworkService.GetClassSubjectDropdownAsync();
            return Ok(data);
        }
    }
}
