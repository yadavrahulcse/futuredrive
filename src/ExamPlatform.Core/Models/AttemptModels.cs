namespace ExamPlatform.Core.Models;

public sealed class StudentAnswer
{
    public Guid QuestionId { get; init; }
    public IReadOnlyList<Guid> SelectedOptionIds { get; init; } = [];
    public string? TextAnswer { get; init; }
    public int TimeSpentSeconds { get; init; }
    public bool IsMarkedForReview { get; init; }
}

public sealed class AttemptQuestion
{
    public Guid QuestionId { get; init; }
    public string Section { get; init; } = string.Empty;
    public int OrderNumber { get; init; }
    public Question Question { get; init; } = new();
}

public sealed class StudentAttempt
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public Guid StudentId { get; init; }
    public Guid TestSeriesId { get; init; }
    public DateTimeOffset StartedAt { get; init; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? SubmittedAt { get; set; }
    public decimal Score { get; set; }
    public AttemptStatus Status { get; set; } = AttemptStatus.InProgress;
    public int SwitchedTabs { get; set; }
    public List<AttemptQuestion> Questions { get; init; } = [];
    public List<StudentAnswer> Answers { get; init; } = [];
}

public sealed class ResultItem
{
    public Guid QuestionId { get; init; }
    public bool Correct { get; init; }
    public decimal MarksAwarded { get; init; }
    public Dictionary<string, string> ExplanationText { get; init; } = new();
}

public sealed class AttemptResult
{
    public Guid AttemptId { get; init; }
    public decimal Score { get; init; }
    public decimal TotalMarks { get; init; }
    public int CorrectAnswers { get; init; }
    public int IncorrectAnswers { get; init; }
    public decimal AccuracyPercentage { get; init; }
    public int Rank { get; init; }
    public decimal Percentile { get; init; }
    public IReadOnlyList<ResultItem> Items { get; init; } = [];
}

public sealed class AdminOverview
{
    public int TotalExams { get; init; }
    public int TotalQuestions { get; init; }
    public int TotalAttempts { get; init; }
    public int CompletedAttempts { get; init; }
    public IReadOnlyList<string> SupportedLanguages { get; init; } = [];
}
