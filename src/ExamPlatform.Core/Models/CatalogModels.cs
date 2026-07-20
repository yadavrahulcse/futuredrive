namespace ExamPlatform.Core.Models;

public sealed class Category
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public string Code { get; init; } = string.Empty;
    public string Name { get; init; } = string.Empty;
    public Guid? ParentId { get; init; }
}

public sealed class Subject
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public Guid CategoryId { get; init; }
    public string Name { get; init; } = string.Empty;
    public string LanguageCode { get; init; } = "en";
}

public sealed class Exam
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public Guid CategoryId { get; init; }
    public string Title { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
    public int DurationMinutes { get; init; }
    public decimal TotalMarks { get; init; }
    public decimal NegativeMarkingRatio { get; init; }
    public ExamStatus Status { get; init; } = ExamStatus.Draft;
    public IReadOnlyList<string> SupportedLanguages { get; init; } = ["en", "hi"];
}

public sealed class TestSeries
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public Guid ExamId { get; init; }
    public string Title { get; init; } = string.Empty;
    public int SequenceNumber { get; init; }
    public bool IsFree { get; init; }
    public DateTimeOffset ReleaseDate { get; init; } = DateTimeOffset.UtcNow;
}

public sealed class TestSeriesQuestion
{
    public Guid TestSeriesId { get; init; }
    public Guid QuestionId { get; init; }
    public string Section { get; init; } = string.Empty;
    public int OrderNumber { get; init; }
}
