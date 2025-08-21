using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using SchoolManagmentSystem.Services.Interfaces;
using SchoolManagmentSystem.ViewModels;
using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Hosting;
using SchoolManagmentSystem.Services;

namespace SchoolManagmentSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeworkSubmissionController : ControllerBase
    {
        private readonly IHomeworkSubmissionService _service;
        private readonly IWebHostEnvironment _env;

        public HomeworkSubmissionController(IHomeworkSubmissionService service, IWebHostEnvironment env)
        {
            _service = service;
            _env = env;
        }

        [HttpGet]
        public async Task<ActionResult<List<HomeworkSubmissionViewModel>>> GetAll()
        {
            var submissions = await _service.GetAllAsync();
            return Ok(submissions);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HomeworkSubmissionViewModel>> GetById(int id)
        {
            var submission = await _service.GetByIdAsync(id);
            if (submission == null) return NotFound();
            return Ok(submission);
        }


        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] HomeworkSubmissionViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _service.AddAsync(model);
            return Ok(new { message = "Homework created successfully" });
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] HomeworkSubmissionViewModel update)
        {
            if (id != update.SubmissionId)
                return BadRequest();

            var existing = await _service.GetByIdAsync(id);
            if (existing == null) return NotFound();

            await _service.UpdateAsync(update);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var existing = await _service.GetByIdAsync(id);
            if (existing == null) return NotFound();

            await _service.DeleteAsync(id);
            return NoContent();
        }


        [HttpGet("homework-dropdown")]
        public async Task<IActionResult> GetHomeworkSubjectDropdown()
        {
            var data = await _service.GetHomeworkDropdownAsync();
            return Ok(data);
        }


        [HttpGet("students-dropdown")]
        public async Task<IActionResult> GetStudentsDropdown()
        {
            var subjects = await _service.GetStudentDropdownAsync();
            return Ok(subjects);
        }

        [HttpPost("upload")]
        public async Task<IActionResult> Upload([FromForm] int homeworkId, [FromForm] int studentId, [FromForm] IFormFile file)
        {
            Console.WriteLine($"Received homeworkId: {homeworkId}, studentId: {studentId}, file: {file?.FileName}");

            if (file == null || file.Length == 0)
                return BadRequest("Nuk u ngarkua asnjë dokument.");

            // Save path
            var uploadPath = Path.Combine(_env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot"), "uploads");
            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            var fileName = $"{Guid.NewGuid()}_{file.FileName}";
            var filePath = Path.Combine(uploadPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Kontrolli për status (vonuar ose jo)
            var homework = await _service.GetHomeworkByIdAsync(homeworkId);
            if (homework == null)
                return BadRequest("Detyra nuk ekziston.");

            string status = DateTime.Now > homework.DueDate ? "Late" : "Submitted";

            // Shto në databazë
            var submission = new HomeworkSubmissionViewModel
            {
                HomeworkId = homeworkId,
                StudentId = studentId,
                FilePath = $"/uploads/{fileName}",
                SubmittedAt = DateTime.Now,
                Status = status,
                Grade = null
            };

            await _service.AddAsync(submission);

            return Ok(new { message = "Detyra u dorëzua me sukses!" });
        }
    }
}