using ExamPlatform.Application.DTOs;
using ExamPlatform.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExamPlatform.API.Controllers;

[ApiController]
[Route("api/auth")]
public sealed class AuthController(ExamPlatformService service) : ControllerBase
{
    [HttpPost("send-otp")]
    public IActionResult SendOtp([FromBody] SendOtpRequest request) => Ok(service.SendOtp(request));

    [HttpPost("verify-otp")]
    public IActionResult VerifyOtp([FromBody] VerifyOtpRequest request)
    {
        try
        {
            return Ok(service.VerifyOtp(request));
        }
        catch (InvalidOperationException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
    }
}
