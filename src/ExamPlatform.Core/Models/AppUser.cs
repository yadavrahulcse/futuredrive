namespace ExamPlatform.Core.Models;

public sealed class AppUser
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public string FullName { get; init; } = string.Empty;
    public string MobileNumber { get; init; } = string.Empty;
    public string? Email { get; init; }
    public UserRole Role { get; init; } = UserRole.Student;
    public string PreferredLanguage { get; init; } = "en";
    public DateTimeOffset CreatedAt { get; init; } = DateTimeOffset.UtcNow;
}
