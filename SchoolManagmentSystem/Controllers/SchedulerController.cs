using Scheduler.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Scheduler.Repositories;
using Scheduler.Services.Interfaces;


namespace SchoolManagmentSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchedulerController(IAppointmentRepository appointmentRepository, IAppointmentService appointmentService, ILogger<SchedulerController> logger) : ControllerBase
    {

        //[HttpGet("GetAll")]
        //public async Task<IActionResult> GetEvents()
        //{
        //    var events = await appointmentService.GetAllAsync();
        //    return Ok(events);
        //}
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetEvents()
        {
            try
            {
                var events = await appointmentService.GetAllAsync();
                return Ok(events);
            }
            catch (Exception ex)
            {
                // Log exception here
                return StatusCode(500, new { message = ex.Message, stackTrace = ex.StackTrace });
            }
        }



        [HttpPost("CheckOverLap")]
        public async Task<IActionResult> CheckOverlap([FromBody] AppointmentViewModel viewModel)
        {
            var isOverlapping = await appointmentService.IsOverlappingAsync(viewModel);
            return Ok(new { isOverlapping });
        }



        [HttpPost("Add")]
        public async Task<IActionResult> AddEvent([FromBody] AppointmentViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new
                {
                    success = false,
                });
            }

            var isOverlapping = await appointmentService.IsOverlappingAsync(viewModel);
            try
            {
                await appointmentService.AddAsync(viewModel);

                if (isOverlapping)
                {
                    return Ok(new
                    {
                        success = true,
                        message = "We encountered an overlapping appointment, however the new appointment was saved successfully.",
                        updatedRow = viewModel
                    });
                }
                else
                {
                    return Ok(new
                    {
                        success = true,
                        message = "Appointment added successfully.",
                        updatedRow = viewModel
                    });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvent(int id, [FromBody] AppointmentViewModel viewModel)
        {
            if (viewModel == null || viewModel.Id != id)
                return BadRequest("Invalid appointment ID.");

            try
            {
                await appointmentService.UpdateAsync(viewModel);
                return Ok(viewModel);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Error updating appointment with ID {id}");
                return StatusCode(500, new { message = "Error updating event", error = ex.Message });
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveEvent(int id)
        {
            if (id <= 0)
                return BadRequest(new { success = false, message = "Invalid event ID" });

            try
            {
                await appointmentService.RemoveAsync(id);
                return Ok(new { success = true });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }


    }
}
