using ExamPlatform.Core.Interfaces;
using ExamPlatform.Core.Models;

namespace ExamPlatform.Infrastructure.Services;

public sealed class InMemoryExamPlatformRepository : IExamPlatformRepository
{
    private readonly List<Category> _categories;
    private readonly List<Subject> _subjects;
    private readonly List<Exam> _exams;
    private readonly List<TestSeries> _testSeries;
    private readonly List<Question> _questions;
    private readonly List<TestSeriesQuestion> _testSeriesQuestions;
    private readonly List<StudentAttempt> _attempts = [];
    private readonly Dictionary<Guid, AttemptResult> _results = new();

    public InMemoryExamPlatformRepository()
    {
        var upscCategory = new Category { Id = Guid.NewGuid(), Code = "UPSC", Name = "UPSC" };
        var sscCategory = new Category { Id = Guid.NewGuid(), Code = "SSC", Name = "SSC" };
        _categories = [upscCategory, sscCategory];

        var politySubject = new Subject { Id = Guid.NewGuid(), CategoryId = upscCategory.Id, Name = "Polity" };
        var aptitudeSubject = new Subject { Id = Guid.NewGuid(), CategoryId = sscCategory.Id, Name = "Quantitative Aptitude" };
        _subjects = [politySubject, aptitudeSubject];

        var upscExam = new Exam
        {
            Id = Guid.NewGuid(),
            CategoryId = upscCategory.Id,
            Title = "UPSC Prelims Mock Pack",
            Description = "GS mock tests with bilingual questions and answer explanations.",
            DurationMinutes = 120,
            TotalMarks = 200,
            NegativeMarkingRatio = 0.33m,
            Status = ExamStatus.Published,
            SupportedLanguages = ["en", "hi"]
        };
        var sscExam = new Exam
        {
            Id = Guid.NewGuid(),
            CategoryId = sscCategory.Id,
            Title = "SSC CGL Smart Practice",
            Description = "Short sectional tests optimized for mobile-first practice sessions.",
            DurationMinutes = 60,
            TotalMarks = 100,
            NegativeMarkingRatio = 0.25m,
            Status = ExamStatus.Published,
            SupportedLanguages = ["en", "hi"]
        };
        _exams = [upscExam, sscExam];

        var upscSeries = new TestSeries { Id = Guid.NewGuid(), ExamId = upscExam.Id, Title = "UPSC GS Test 01", SequenceNumber = 1, IsFree = true };
        var sscSeries = new TestSeries { Id = Guid.NewGuid(), ExamId = sscExam.Id, Title = "SSC Quant Booster 01", SequenceNumber = 1, IsFree = true };
        _testSeries = [upscSeries, sscSeries];

        var q1 = new Question
        {
            Id = Guid.NewGuid(),
            SubjectId = politySubject.Id,
            Type = QuestionType.Mcq,
            Text = new Dictionary<string, string>
            {
                ["en"] = "Which Article of the Indian Constitution deals with equality before law?",
                ["hi"] = "भारतीय संविधान का कौन-सा अनुच्छेद विधि के समक्ष समानता से संबंधित है?"
            },
            ExplanationText = new Dictionary<string, string>
            {
                ["en"] = "Article 14 guarantees equality before law and equal protection of laws.",
                ["hi"] = "अनुच्छेद 14 विधि के समक्ष समानता और विधियों के समान संरक्षण की गारंटी देता है।"
            },
            Marks = 2,
            NegativeMarks = 0.66m,
            Difficulty = "Easy",
            Tags = ["polity", "constitution"],
            Options =
            [
                new QuestionOption { Text = new() { ["en"] = "Article 14", ["hi"] = "अनुच्छेद 14" }, IsCorrect = true },
                new QuestionOption { Text = new() { ["en"] = "Article 19", ["hi"] = "अनुच्छेद 19" }, IsCorrect = false },
                new QuestionOption { Text = new() { ["en"] = "Article 21", ["hi"] = "अनुच्छेद 21" }, IsCorrect = false },
                new QuestionOption { Text = new() { ["en"] = "Article 32", ["hi"] = "अनुच्छेद 32" }, IsCorrect = false }
            ]
        };

        var q2 = new Question
        {
            Id = Guid.NewGuid(),
            SubjectId = aptitudeSubject.Id,
            Type = QuestionType.Integer,
            Text = new Dictionary<string, string>
            {
                ["en"] = "If 12 workers finish a task in 15 days, how many days will 20 workers take for the same task?",
                ["hi"] = "यदि 12 मजदूर किसी कार्य को 15 दिनों में पूरा करते हैं, तो वही कार्य 20 मजदूर कितने दिनों में करेंगे?"
            },
            ExplanationText = new Dictionary<string, string>
            {
                ["en"] = "Work = 12 × 15 = 180 worker-days. 180 / 20 = 9 days.",
                ["hi"] = "कार्य = 12 × 15 = 180 श्रम-दिवस। 180 / 20 = 9 दिन।"
            },
            Marks = 2,
            NegativeMarks = 0.5m,
            Difficulty = "Medium",
            Tags = ["aptitude", "time-and-work"]
        };

        var q3 = new Question
        {
            Id = Guid.NewGuid(),
            SubjectId = politySubject.Id,
            Type = QuestionType.TrueFalse,
            Text = new Dictionary<string, string>
            {
                ["en"] = "The President of India can declare a National Emergency under Article 352.",
                ["hi"] = "भारत के राष्ट्रपति अनुच्छेद 352 के अंतर्गत राष्ट्रीय आपातकाल घोषित कर सकते हैं।"
            },
            ExplanationText = new Dictionary<string, string>
            {
                ["en"] = "This statement is true. Article 352 covers proclamation of national emergency.",
                ["hi"] = "यह कथन सही है। अनुच्छेद 352 राष्ट्रीय आपातकाल की घोषणा से संबंधित है।"
            },
            Marks = 1,
            NegativeMarks = 0.25m,
            Difficulty = "Easy",
            Tags = ["emergency-provisions"],
            Options =
            [
                new QuestionOption { Text = new() { ["en"] = "True", ["hi"] = "सही" }, IsCorrect = true },
                new QuestionOption { Text = new() { ["en"] = "False", ["hi"] = "गलत" }, IsCorrect = false }
            ]
        };

        _questions = [q1, q2, q3];
        _testSeriesQuestions =
        [
            new TestSeriesQuestion { TestSeriesId = upscSeries.Id, QuestionId = q1.Id, Section = "General Studies", OrderNumber = 1 },
            new TestSeriesQuestion { TestSeriesId = upscSeries.Id, QuestionId = q3.Id, Section = "General Studies", OrderNumber = 2 },
            new TestSeriesQuestion { TestSeriesId = sscSeries.Id, QuestionId = q2.Id, Section = "Quantitative Aptitude", OrderNumber = 1 }
        ];
    }

    public IReadOnlyList<Category> GetCategories() => _categories;
    public IReadOnlyList<Subject> GetSubjects() => _subjects;
    public IReadOnlyList<Exam> GetExams(Guid? categoryId = null) => categoryId is null ? _exams : _exams.Where(x => x.CategoryId == categoryId).ToList();
    public Exam? GetExam(Guid examId) => _exams.FirstOrDefault(x => x.Id == examId);
    public IReadOnlyList<TestSeries> GetTestSeries(Guid examId) => _testSeries.Where(x => x.ExamId == examId).OrderBy(x => x.SequenceNumber).ToList();
    public IReadOnlyList<Question> GetQuestions() => _questions.OrderBy(x => x.Difficulty).ToList();

    public Question AddQuestion(Question question)
    {
        var normalized = question with { };
        _questions.Add(normalized);
        return normalized;
    }

    public StudentAttempt StartAttempt(Guid studentId, Guid testSeriesId)
    {
        var attempt = new StudentAttempt
        {
            StudentId = studentId,
            TestSeriesId = testSeriesId,
            Questions = _testSeriesQuestions
                .Where(link => link.TestSeriesId == testSeriesId)
                .OrderBy(link => link.OrderNumber)
                .Select(link => new AttemptQuestion
                {
                    QuestionId = link.QuestionId,
                    Section = link.Section,
                    OrderNumber = link.OrderNumber,
                    Question = _questions.First(question => question.Id == link.QuestionId)
                })
                .ToList()
        };

        _attempts.Add(attempt);
        return attempt;
    }

    public StudentAttempt? GetAttempt(Guid attemptId) => _attempts.FirstOrDefault(x => x.Id == attemptId);

    public StudentAttempt SaveAnswer(Guid attemptId, StudentAnswer answer)
    {
        var attempt = _attempts.First(x => x.Id == attemptId);
        var existing = attempt.Answers.FirstOrDefault(x => x.QuestionId == answer.QuestionId);
        if (existing is not null)
        {
            attempt.Answers.Remove(existing);
        }

        attempt.Answers.Add(answer);
        return attempt;
    }

    public AttemptResult SubmitAttempt(Guid attemptId)
    {
        var attempt = _attempts.First(x => x.Id == attemptId);
        attempt.Status = AttemptStatus.Submitted;
        attempt.SubmittedAt = DateTimeOffset.UtcNow;

        var items = new List<ResultItem>();
        decimal totalScore = 0;
        decimal totalMarks = 0;
        var correct = 0;
        var incorrect = 0;

        foreach (var attemptQuestion in attempt.Questions)
        {
            totalMarks += attemptQuestion.Question.Marks;
            var answer = attempt.Answers.FirstOrDefault(x => x.QuestionId == attemptQuestion.QuestionId);
            var evaluation = Evaluate(attemptQuestion.Question, answer);
            if (evaluation.Correct) correct++; else incorrect += answer is null ? 0 : 1;
            totalScore += evaluation.MarksAwarded;
            items.Add(new ResultItem
            {
                QuestionId = attemptQuestion.QuestionId,
                Correct = evaluation.Correct,
                MarksAwarded = evaluation.MarksAwarded,
                ExplanationText = attemptQuestion.Question.ExplanationText
            });
        }

        attempt.Score = totalScore;

        var result = new AttemptResult
        {
            AttemptId = attempt.Id,
            Score = totalScore,
            TotalMarks = totalMarks,
            CorrectAnswers = correct,
            IncorrectAnswers = incorrect,
            AccuracyPercentage = attempt.Questions.Count == 0 ? 0 : Math.Round((decimal)correct / attempt.Questions.Count * 100, 2),
            Rank = Math.Max(1, _attempts.Count(x => x.Score > totalScore) + 1),
            Percentile = _attempts.Count == 0 ? 100 : Math.Round(100 - ((decimal)(Math.Max(0, attempt.Score == 0 ? _attempts.Count - 1 : _attempts.Count(x => x.Score > totalScore))) / _attempts.Count * 100), 2),
            Items = items
        };

        _results[attempt.Id] = result;
        return result;
    }

    public AttemptResult? GetResult(Guid attemptId) => _results.TryGetValue(attemptId, out var result) ? result : null;

    public AdminOverview GetOverview() => new()
    {
        TotalExams = _exams.Count,
        TotalQuestions = _questions.Count,
        TotalAttempts = _attempts.Count,
        CompletedAttempts = _attempts.Count(x => x.Status != AttemptStatus.InProgress),
        SupportedLanguages = ["en", "hi", "ta", "te", "mr", "bn"]
    };

    private static (bool Correct, decimal MarksAwarded) Evaluate(Question question, StudentAnswer? answer)
    {
        if (answer is null)
        {
            return (false, 0);
        }

        return question.Type switch
        {
            QuestionType.Mcq or QuestionType.TrueFalse => EvaluateObjective(question, answer),
            QuestionType.Msq => EvaluateObjective(question, answer),
            QuestionType.FillBlank or QuestionType.Integer => EvaluateText(question, answer),
            _ => (false, 0)
        };
    }

    private static (bool Correct, decimal MarksAwarded) EvaluateObjective(Question question, StudentAnswer answer)
    {
        var expected = question.Options.Where(x => x.IsCorrect).Select(x => x.Id).OrderBy(x => x).ToArray();
        var actual = answer.SelectedOptionIds.OrderBy(x => x).ToArray();
        var correct = expected.SequenceEqual(actual);
        return correct ? (true, question.Marks) : (false, -question.NegativeMarks);
    }

    private static (bool Correct, decimal MarksAwarded) EvaluateText(Question question, StudentAnswer answer)
    {
        var accepted = question.ExplanationText.TryGetValue("acceptedAnswer", out var value)
            ? value
            : question.Type == QuestionType.Integer ? "9" : string.Empty;

        var correct = string.Equals(answer.TextAnswer?.Trim(), accepted.Trim(), StringComparison.OrdinalIgnoreCase);
        return correct ? (true, question.Marks) : (false, string.IsNullOrWhiteSpace(answer.TextAnswer) ? 0 : -question.NegativeMarks);
    }
}
