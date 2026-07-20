using ExamPlatform.Application.Services;
using ExamPlatform.Core.Interfaces;
using ExamPlatform.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSignalR();
builder.Services.AddCors(options =>
{
    options.AddPolicy("web", policy =>
        policy.AllowAnyHeader()
              .AllowAnyMethod()
              .AllowAnyOrigin());
});

builder.Services.AddSingleton<IExamPlatformRepository, InMemoryExamPlatformRepository>();
builder.Services.AddSingleton<IAuthService, InMemoryAuthService>();
builder.Services.AddScoped<ExamPlatformService>();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors("web");
app.MapControllers();
app.MapHub<ExamPlatform.API.Hubs.ExamHub>("/hubs/exam");

app.Run();
