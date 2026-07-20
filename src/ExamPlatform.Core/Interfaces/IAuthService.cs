using ExamPlatform.Core.Models;

namespace ExamPlatform.Core.Interfaces;

public interface IAuthService
{
    OtpChallenge SendOtp(string mobileNumber, UserRole role);
    Session VerifyOtp(string mobileNumber, string otp, UserRole role);
}

public sealed class OtpChallenge
{
    public string MobileNumber { get; init; } = string.Empty;
    public int ExpiresInSeconds { get; init; }
    public string TransactionId { get; init; } = string.Empty;
}

public sealed class Session
{
    public string AccessToken { get; init; } = string.Empty;
    public string RefreshToken { get; init; } = string.Empty;
    public int ExpiresInSeconds { get; init; }
    public AppUser User { get; init; } = new();
}
