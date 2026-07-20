using ExamPlatform.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExamPlatform.API.Controllers;

[ApiController]
[Route("api/results")]
public sealed class ResultsController(ExamPlatformService service) : ControllerBase
{
    [HttpGet("{attemptId:guid}")]
    public IActionResult Get(Guid attemptId)
    {
        var result = service.GetResult(attemptId);
        return result is null ? NotFound() : Ok(result);
    }
}
