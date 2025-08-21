//using Microsoft.AspNetCore.Mvc;
//using SchoolManagmentSystem.Models;

//namespace SchoolManagmentSystem.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class AssistantController : ControllerBase
//    {
//        private readonly AIAssistantService _aiService;

//        public AssistantController(AIAssistantService aiService)
//        {
//            _aiService = aiService;
//        }

//        [HttpPost("query")]
//        public async Task<IActionResult> QueryAssistant([FromBody] AssistantQuery query)
//        {
//            var sql = await _aiService.GenerateSQLFromQuestion(query.Question);
//            var result = await _aiService.ExecuteSQL(sql);         
//            var answer = _aiService.FormatResult(result);
//            return Ok(new { answer });
//        }
//    }
//}

using Microsoft.AspNetCore.Mvc;
using SchoolManagmentSystem.Models;
using SchoolManagmentSystem.Services;

namespace SchoolManagmentSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AssistantController : ControllerBase
    {
        private readonly AIAssistantService _aiService;

        public AssistantController(AIAssistantService aiService)
        {
            _aiService = aiService;
        }

        [HttpPost("query")]
        public async Task<IActionResult> QueryAssistant([FromBody] AssistantQuery query)
        {
            try
            {
                var sql = await _aiService.GenerateSQLFromQuestion(query.Question);

                if (string.IsNullOrWhiteSpace(sql))
                    return BadRequest(new { error = "Failed to generate SQL from question." });

                var result = await _aiService.ExecuteSQL(sql);

                if (result == null)
                    return NotFound(new { error = "No data returned from SQL execution." });

                var answer = _aiService.FormatResult(result);

                return Ok(new { answer });
            }
            catch (KeyNotFoundException ex)
            {
                return StatusCode(500, new { error = "Unexpected response format from OpenAI.", details = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Internal server error.", details = ex.Message });
            }
        }
    }
}

