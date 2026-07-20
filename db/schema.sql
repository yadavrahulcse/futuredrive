-- SQL Server schema scaffold for Bharat Competitive Exam Platform

CREATE TABLE Users (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    FullName NVARCHAR(200) NOT NULL,
    MobileNumber NVARCHAR(20) NOT NULL UNIQUE,
    Email NVARCHAR(254) NULL,
    Role NVARCHAR(30) NOT NULL,
    PreferredLanguage NVARCHAR(10) NOT NULL DEFAULT 'en',
    ConsentAccepted BIT NOT NULL DEFAULT 0,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

CREATE TABLE Categories (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    Name NVARCHAR(150) NOT NULL,
    Code NVARCHAR(50) NOT NULL UNIQUE,
    ParentId UNIQUEIDENTIFIER NULL,
    CONSTRAINT FK_Categories_Parent FOREIGN KEY (ParentId) REFERENCES Categories(Id)
);

CREATE TABLE Subjects (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    CategoryId UNIQUEIDENTIFIER NOT NULL,
    Name NVARCHAR(150) NOT NULL,
    LanguageCode NVARCHAR(10) NOT NULL DEFAULT 'en',
    CONSTRAINT FK_Subjects_Categories FOREIGN KEY (CategoryId) REFERENCES Categories(Id)
);

CREATE TABLE Exams (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    CategoryId UNIQUEIDENTIFIER NOT NULL,
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX) NULL,
    DurationMinutes INT NOT NULL,
    TotalMarks DECIMAL(10,2) NOT NULL,
    NegativeMarkingRatio DECIMAL(5,2) NOT NULL DEFAULT 0,
    SupportedLanguagesJson NVARCHAR(MAX) NOT NULL,
    Status NVARCHAR(30) NOT NULL,
    CreatedBy UNIQUEIDENTIFIER NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Exams_Categories FOREIGN KEY (CategoryId) REFERENCES Categories(Id),
    CONSTRAINT FK_Exams_Users FOREIGN KEY (CreatedBy) REFERENCES Users(Id)
);

CREATE TABLE Questions (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    SubjectId UNIQUEIDENTIFIER NOT NULL,
    Type NVARCHAR(50) NOT NULL,
    TextJson NVARCHAR(MAX) NOT NULL,
    ImageUrl NVARCHAR(500) NULL,
    AudioUrl NVARCHAR(500) NULL,
    ExplanationTextJson NVARCHAR(MAX) NULL,
    ExplanationImageUrl NVARCHAR(500) NULL,
    Marks DECIMAL(10,2) NOT NULL,
    NegativeMarks DECIMAL(10,2) NOT NULL DEFAULT 0,
    Difficulty NVARCHAR(20) NOT NULL,
    TagsJson NVARCHAR(MAX) NOT NULL,
    LanguageCode NVARCHAR(10) NOT NULL DEFAULT 'en',
    CreatedBy UNIQUEIDENTIFIER NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Questions_Subjects FOREIGN KEY (SubjectId) REFERENCES Subjects(Id),
    CONSTRAINT FK_Questions_Users FOREIGN KEY (CreatedBy) REFERENCES Users(Id)
);

CREATE TABLE QuestionOptions (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    QuestionId UNIQUEIDENTIFIER NOT NULL,
    OptionTextJson NVARCHAR(MAX) NOT NULL,
    ImageUrl NVARCHAR(500) NULL,
    IsCorrect BIT NOT NULL,
    DisplayOrder INT NOT NULL,
    CONSTRAINT FK_QuestionOptions_Questions FOREIGN KEY (QuestionId) REFERENCES Questions(Id) ON DELETE CASCADE
);

CREATE TABLE TestSeries (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    ExamId UNIQUEIDENTIFIER NOT NULL,
    Title NVARCHAR(200) NOT NULL,
    SequenceNumber INT NOT NULL,
    IsFree BIT NOT NULL DEFAULT 1,
    ReleaseDate DATETIME2 NULL,
    Status NVARCHAR(30) NOT NULL DEFAULT 'Draft',
    CONSTRAINT FK_TestSeries_Exams FOREIGN KEY (ExamId) REFERENCES Exams(Id)
);

CREATE TABLE TestSeriesQuestions (
    TestSeriesId UNIQUEIDENTIFIER NOT NULL,
    QuestionId UNIQUEIDENTIFIER NOT NULL,
    SectionName NVARCHAR(100) NOT NULL,
    OrderNumber INT NOT NULL,
    PRIMARY KEY (TestSeriesId, QuestionId),
    CONSTRAINT FK_TestSeriesQuestions_TestSeries FOREIGN KEY (TestSeriesId) REFERENCES TestSeries(Id) ON DELETE CASCADE,
    CONSTRAINT FK_TestSeriesQuestions_Questions FOREIGN KEY (QuestionId) REFERENCES Questions(Id)
);

CREATE TABLE StudentAttempts (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    StudentId UNIQUEIDENTIFIER NOT NULL,
    TestSeriesId UNIQUEIDENTIFIER NOT NULL,
    StartedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    SubmittedAt DATETIME2 NULL,
    Score DECIMAL(10,2) NULL,
    Status NVARCHAR(30) NOT NULL,
    SwitchedTabs INT NOT NULL DEFAULT 0,
    CONSTRAINT FK_StudentAttempts_Users FOREIGN KEY (StudentId) REFERENCES Users(Id),
    CONSTRAINT FK_StudentAttempts_TestSeries FOREIGN KEY (TestSeriesId) REFERENCES TestSeries(Id)
);

CREATE TABLE StudentAnswers (
    AttemptId UNIQUEIDENTIFIER NOT NULL,
    QuestionId UNIQUEIDENTIFIER NOT NULL,
    SelectedOptionIdsJson NVARCHAR(MAX) NULL,
    TextAnswer NVARCHAR(MAX) NULL,
    TimeSpentSeconds INT NOT NULL DEFAULT 0,
    IsMarkedForReview BIT NOT NULL DEFAULT 0,
    PRIMARY KEY (AttemptId, QuestionId),
    CONSTRAINT FK_StudentAnswers_Attempts FOREIGN KEY (AttemptId) REFERENCES StudentAttempts(Id) ON DELETE CASCADE,
    CONSTRAINT FK_StudentAnswers_Questions FOREIGN KEY (QuestionId) REFERENCES Questions(Id)
);

CREATE TABLE Translations (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    EntityType NVARCHAR(100) NOT NULL,
    EntityId UNIQUEIDENTIFIER NOT NULL,
    FieldName NVARCHAR(100) NOT NULL,
    LanguageCode NVARCHAR(10) NOT NULL,
    Value NVARCHAR(MAX) NOT NULL
);

CREATE TABLE Media (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    Url NVARCHAR(500) NOT NULL,
    MediaType NVARCHAR(20) NOT NULL,
    UploadedBy UNIQUEIDENTIFIER NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Media_Users FOREIGN KEY (UploadedBy) REFERENCES Users(Id)
);

CREATE TABLE Analytics (
    AttemptId UNIQUEIDENTIFIER NOT NULL,
    QuestionId UNIQUEIDENTIFIER NOT NULL,
    IsCorrect BIT NOT NULL,
    TimeSpentSeconds INT NOT NULL,
    ScoreImpact DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (AttemptId, QuestionId),
    CONSTRAINT FK_Analytics_Attempts FOREIGN KEY (AttemptId) REFERENCES StudentAttempts(Id) ON DELETE CASCADE,
    CONSTRAINT FK_Analytics_Questions FOREIGN KEY (QuestionId) REFERENCES Questions(Id)
);

CREATE INDEX IX_Users_MobileNumber ON Users(MobileNumber);
CREATE INDEX IX_Exams_CategoryId ON Exams(CategoryId);
CREATE INDEX IX_Questions_SubjectId ON Questions(SubjectId);
CREATE INDEX IX_TestSeries_ExamId ON TestSeries(ExamId);
CREATE INDEX IX_StudentAttempts_TestSeriesId ON StudentAttempts(TestSeriesId);
CREATE INDEX IX_StudentAttempts_StudentId ON StudentAttempts(StudentId);
