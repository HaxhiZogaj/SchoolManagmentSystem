using Microsoft.AspNetCore.Mvc;
using SchoolManagmentSystem.Interfaces;
using SchoolManagmentSystem.ViewModels;
using SchoolManagmentSystem.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;
using SchoolManagmentSystem.Services;
using Newtonsoft.Json;

namespace SchoolManagmentSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParentController : ControllerBase
    {
        private readonly IParentService _service;

        public ParentController(IParentService service)
        {
            _service = service;
        }

        
        [HttpGet]
        public async Task<ActionResult<List<ParentViewModel>>> GetAll()
        {
            var parents = await _service.GetAllAsync();
            return Ok(parents);
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<ParentViewModel>> GetById(int id)
        {
            var parent = await _service.GetByIdAsync(id);
            if (parent == null)
                return NotFound();
            return Ok(parent);
        }


        //[HttpPost("Add")]
        //public async Task<IActionResult> Add([FromBody] ParentViewModel model)
        //{
        //    if (!ModelState.IsValid)
        //        return BadRequest(ModelState);

        //    await _service.AddAsync(model);
        //    return Ok();
        //}
        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] ParentViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    Console.WriteLine("Invalid ModelState: " + string.Join(", ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage)));
                    return BadRequest(ModelState);
                }
                await _service.AddAsync(model);
                return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in Add: {ex.Message}\n{ex.StackTrace}");
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ParentViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != model.ParentId)
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

        
        [HttpGet("user-dropdown")]
        public async Task<ActionResult<List<UserDto>>> GetUserDropdown()
        {
            var users = await _service.GetUserDropdownAsync();
            return Ok(users);
        }
    }
}
