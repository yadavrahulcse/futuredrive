using System.Collections.Concurrent;
using System.Security.Cryptography;
using System.Text;
using ExamPlatform.Core.Interfaces;
using ExamPlatform.Core.Models;

namespace ExamPlatform.Infrastructure.Services;

public sealed class InMemoryAuthService : IAuthService
{
    private readonly ConcurrentDictionary<string, (string Otp, UserRole Role)> _otpStore = new();

    public OtpChallenge SendOtp(string mobileNumber, UserRole role)
    {
        const string otp = "123456";
        _otpStore[mobileNumber] = (otp, role);

        return new OtpChallenge
        {
            MobileNumber = mobileNumber,
            ExpiresInSeconds = 300,
            TransactionId = Guid.NewGuid().ToString("N")
        };
    }

    public Session VerifyOtp(string mobileNumber, string otp, UserRole role)
    {
        if (!_otpStore.TryGetValue(mobileNumber, out var challenge) || challenge.Otp != otp)
        {
            throw new InvalidOperationException("Invalid OTP. Use 123456 for the scaffold.");
        }

        var user = new AppUser
        {
            FullName = role == UserRole.Student ? "Demo Student" : "Demo Admin",
            MobileNumber = mobileNumber,
            Role = role,
            PreferredLanguage = "en"
        };

        return new Session
        {
            AccessToken = Convert.ToBase64String(SHA256.HashData(Encoding.UTF8.GetBytes($"{mobileNumber}:{Guid.NewGuid()}"))),
            RefreshToken = Guid.NewGuid().ToString("N"),
            ExpiresInSeconds = 3600,
            User = user
        };
    }
}
