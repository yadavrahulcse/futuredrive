using ExamPlatform.Application.DTOs;
using ExamPlatform.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExamPlatform.API.Controllers;

[ApiController]
[Route("api/attempts")]
public sealed class AttemptsController(ExamPlatformService service) : ControllerBase
{
    [HttpPost("start")]
    public IActionResult StartAttempt([FromBody] StartAttemptRequest request) => Ok(service.StartAttempt(request));

    [HttpGet("{attemptId:guid}")]
    public IActionResult GetAttempt(Guid attemptId)
    {
        var attempt = service.GetAttempt(attemptId);
        return attempt is null ? NotFound() : Ok(attempt);
    }

    [HttpPost("{attemptId:guid}/answers")]
    public IActionResult SaveAnswer(Guid attemptId, [FromBody] SaveAnswerRequest request)
    {
        var attempt = service.SaveAnswer(attemptId, request);
        return Ok(attempt);
    }

    [HttpPost("{attemptId:guid}/submit")]
    public IActionResult Submit(Guid attemptId) => Ok(service.SubmitAttempt(attemptId));
}
