namespace ExamPlatform.Application.DTOs;

public sealed record StartAttemptRequest(Guid StudentId, Guid TestSeriesId);

public sealed record SaveAnswerRequest(
    Guid QuestionId,
    IReadOnlyList<Guid>? SelectedOptionIds,
    string? TextAnswer,
    int TimeSpentSeconds,
    bool IsMarkedForReview);
