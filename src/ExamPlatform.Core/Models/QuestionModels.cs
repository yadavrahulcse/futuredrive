namespace ExamPlatform.Core.Models;

public sealed class QuestionOption
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public Dictionary<string, string> Text { get; init; } = new();
    public string? ImageUrl { get; init; }
    public bool IsCorrect { get; init; }
}

public sealed class Question
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public Guid SubjectId { get; init; }
    public QuestionType Type { get; init; }
    public Dictionary<string, string> Text { get; init; } = new();
    public string? ImageUrl { get; init; }
    public string? AudioUrl { get; init; }
    public Dictionary<string, string> ExplanationText { get; init; } = new();
    public string? ExplanationImageUrl { get; init; }
    public decimal Marks { get; init; }
    public decimal NegativeMarks { get; init; }
    public string Difficulty { get; init; } = "Medium";
    public IReadOnlyList<string> Tags { get; init; } = [];
    public string LanguageCode { get; init; } = "en";
    public IReadOnlyList<QuestionOption> Options { get; init; } = [];
}
