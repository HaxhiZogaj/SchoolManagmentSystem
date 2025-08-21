using Microsoft.AspNetCore.Mvc;
using SchoolManagmentSystem.Models;

namespace SchoolManagmentSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly SchoolMSContext _context;

        public ContactController(SchoolMSContext context)
        {
            _context = context;
        }



        [HttpPost]
        public async Task<IActionResult> PostMessage([FromBody] ContactMessage message)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.ContactMessages.Add(message);
            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Mesazhi u dërgua me sukses!" });
        }
    }
}
