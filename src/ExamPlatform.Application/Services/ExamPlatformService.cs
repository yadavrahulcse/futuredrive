using ExamPlatform.Application.DTOs;
using ExamPlatform.Core.Interfaces;
using ExamPlatform.Core.Models;

namespace ExamPlatform.Application.Services;

public sealed class ExamPlatformService(IExamPlatformRepository repository, IAuthService authService)
{
    public OtpChallenge SendOtp(SendOtpRequest request)
    {
        var role = Enum.TryParse<UserRole>(request.Role, true, out var parsedRole) ? parsedRole : UserRole.Student;
        return authService.SendOtp(request.MobileNumber, role);
    }

    public Session VerifyOtp(VerifyOtpRequest request)
    {
        var role = Enum.TryParse<UserRole>(request.Role, true, out var parsedRole) ? parsedRole : UserRole.Student;
        return authService.VerifyOtp(request.MobileNumber, request.Otp, role);
    }

    public IReadOnlyList<Category> GetCategories() => repository.GetCategories();
    public IReadOnlyList<Exam> GetExams(Guid? categoryId) => repository.GetExams(categoryId);
    public Exam? GetExam(Guid examId) => repository.GetExam(examId);
    public IReadOnlyList<TestSeries> GetTestSeries(Guid examId) => repository.GetTestSeries(examId);
    public IReadOnlyList<Question> GetQuestions() => repository.GetQuestions();
    public AdminOverview GetOverview() => repository.GetOverview();
    public StudentAttempt? GetAttempt(Guid attemptId) => repository.GetAttempt(attemptId);
    public AttemptResult? GetResult(Guid attemptId) => repository.GetResult(attemptId);

    public Question AddQuestion(CreateQuestionRequest request)
    {
        var type = Enum.TryParse<QuestionType>(request.Type.Replace("-", string.Empty), true, out var parsedType)
            ? parsedType
            : QuestionType.Mcq;

        var question = new Question
        {
            SubjectId = request.SubjectId,
            Type = type,
            Text = request.Text,
            ImageUrl = request.ImageUrl,
            AudioUrl = request.AudioUrl,
            ExplanationText = request.ExplanationText ?? new Dictionary<string, string>(),
            ExplanationImageUrl = request.ExplanationImageUrl,
            Marks = request.Marks,
            NegativeMarks = request.NegativeMarks,
            Difficulty = request.Difficulty,
            Tags = request.Tags ?? [],
            Options = request.Options?.Select(option => new QuestionOption
            {
                Id = option.Id == Guid.Empty ? Guid.NewGuid() : option.Id,
                Text = option.Text,
                ImageUrl = option.ImageUrl,
                IsCorrect = option.IsCorrect
            }).ToList() ?? []
        };

        return repository.AddQuestion(question);
    }

    public StudentAttempt StartAttempt(StartAttemptRequest request) => repository.StartAttempt(request.StudentId, request.TestSeriesId);

    public StudentAttempt SaveAnswer(Guid attemptId, SaveAnswerRequest request)
    {
        var answer = new StudentAnswer
        {
            QuestionId = request.QuestionId,
            SelectedOptionIds = request.SelectedOptionIds ?? [],
            TextAnswer = request.TextAnswer,
            TimeSpentSeconds = request.TimeSpentSeconds,
            IsMarkedForReview = request.IsMarkedForReview
        };

        return repository.SaveAnswer(attemptId, answer);
    }

    public AttemptResult SubmitAttempt(Guid attemptId) => repository.SubmitAttempt(attemptId);
}
