namespace ExamPlatform.Application.DTOs;

public sealed record SendOtpRequest(string MobileNumber, string Role = "Student");
public sealed record VerifyOtpRequest(string MobileNumber, string Otp, string Role = "Student");
