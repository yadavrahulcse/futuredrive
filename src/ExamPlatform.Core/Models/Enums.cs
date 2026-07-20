namespace ExamPlatform.Core.Models;

public enum UserRole
{
    Student,
    Admin,
    SuperAdmin
}

public enum ExamStatus
{
    Draft,
    Published,
    Archived
}

public enum QuestionType
{
    Mcq,
    Msq,
    TrueFalse,
    FillBlank,
    Integer,
    Descriptive,
    AssertionReasoning,
    Match,
    Sequence
}

public enum AttemptStatus
{
    InProgress,
    Submitted,
    Evaluated
}
