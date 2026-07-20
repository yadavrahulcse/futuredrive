using ExamPlatform.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExamPlatform.API.Controllers;

[ApiController]
[Route("api/admin")]
public sealed class AdminController(ExamPlatformService service) : ControllerBase
{
    [HttpGet("overview")]
    public IActionResult GetOverview() => Ok(service.GetOverview());
}
