using ExamPlatform.Core.Models;

namespace ExamPlatform.Core.Interfaces;

public interface IExamPlatformRepository
{
    IReadOnlyList<Category> GetCategories();
    IReadOnlyList<Subject> GetSubjects();
    IReadOnlyList<Exam> GetExams(Guid? categoryId = null);
    Exam? GetExam(Guid examId);
    IReadOnlyList<TestSeries> GetTestSeries(Guid examId);
    IReadOnlyList<Question> GetQuestions();
    Question AddQuestion(Question question);
    StudentAttempt StartAttempt(Guid studentId, Guid testSeriesId);
    StudentAttempt? GetAttempt(Guid attemptId);
    StudentAttempt SaveAnswer(Guid attemptId, StudentAnswer answer);
    AttemptResult SubmitAttempt(Guid attemptId);
    AttemptResult? GetResult(Guid attemptId);
    AdminOverview GetOverview();
}
