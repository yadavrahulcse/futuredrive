using ExamPlatform.Application.DTOs;
using ExamPlatform.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExamPlatform.API.Controllers;

[ApiController]
[Route("api/admin/questions")]
public sealed class AdminQuestionsController(ExamPlatformService service) : ControllerBase
{
    [HttpGet]
    public IActionResult GetQuestions() => Ok(service.GetQuestions());

    [HttpPost]
    public IActionResult CreateQuestion([FromBody] CreateQuestionRequest request)
    {
        var question = service.AddQuestion(request);
        return CreatedAtAction(nameof(GetQuestions), new { id = question.Id }, question);
    }
}
