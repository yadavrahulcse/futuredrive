using Microsoft.AspNetCore.SignalR;

namespace ExamPlatform.API.Hubs;

public sealed class ExamHub : Hub
{
    public Task JoinAttempt(string attemptId) => Groups.AddToGroupAsync(Context.ConnectionId, $"attempt-{attemptId}");
    public Task LeaveAttempt(string attemptId) => Groups.RemoveFromGroupAsync(Context.ConnectionId, $"attempt-{attemptId}");
}
