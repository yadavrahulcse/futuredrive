namespace ExamPlatform.Application.DTOs;

public sealed record QuestionOptionDto(
    Guid Id,
    Dictionary<string, string> Text,
    string? ImageUrl,
    bool IsCorrect);

public sealed record CreateQuestionRequest(
    Guid SubjectId,
    string Type,
    Dictionary<string, string> Text,
    string? ImageUrl,
    string? AudioUrl,
    Dictionary<string, string>? ExplanationText,
    string? ExplanationImageUrl,
    decimal Marks,
    decimal NegativeMarks,
    string Difficulty,
    IReadOnlyList<string>? Tags,
    IReadOnlyList<QuestionOptionDto>? Options);
