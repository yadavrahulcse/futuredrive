using ExamPlatform.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExamPlatform.API.Controllers;

[ApiController]
[Route("api/catalog")]
public sealed class CatalogController(ExamPlatformService service) : ControllerBase
{
    [HttpGet("categories")]
    public IActionResult GetCategories() => Ok(service.GetCategories());

    [HttpGet("exams")]
    public IActionResult GetExams([FromQuery] Guid? categoryId) => Ok(service.GetExams(categoryId));

    [HttpGet("exams/{examId:guid}")]
    public IActionResult GetExam(Guid examId)
    {
        var exam = service.GetExam(examId);
        return exam is null ? NotFound() : Ok(new { exam, testSeries = service.GetTestSeries(examId) });
    }
}
