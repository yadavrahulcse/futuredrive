# Bharat Competitive Exam Platform

Progressive web application scaffold for conducting online exams for Indian competitive test categories such as UPSC, SSC, Banking, Railway, JEE, NEET, and state public service exams.

## Stack
- **Backend:** ASP.NET Core 8 Web API (C#)
- **Frontend:** Angular 21 standalone app with PWA support
- **Database:** SQL Server schema scaffold
- **Realtime:** SignalR exam hub scaffold
- **Localization:** English and Hindi starter resources

## Repository layout
- `/src` — ASP.NET Core solution (`ExamPlatform.API`, `ExamPlatform.Core`, `ExamPlatform.Application`, `ExamPlatform.Infrastructure`)
- `/web` — Angular PWA shell for student and admin workflows
- `/api/openapi.yaml` — API contract scaffold for auth, catalog, admin, attempts, and results
- `/db/schema.sql` — SQL Server schema for the exam platform
- `/docs/SRS.md` — software requirement specification
- `/BACKLOG.md` — MVP-first backlog
- `/i18n` — shared translation seed files

## Backend commands
```bash
cd /home/runner/work/futuredrive/futuredrive/src
dotnet build ExamPlatform.slnx
```

## Frontend commands
```bash
cd /home/runner/work/futuredrive/futuredrive/web
npm install
npm run build
npm run test
```

## Delivered scaffold
- OTP-based auth endpoints with in-memory implementation hooks
- Exam catalog, question bank, attempt, result, and admin overview API scaffolds
- SQL schema for multilingual questions, test series, attempts, analytics, and media
- Angular PWA shell with responsive student and admin screens
- Shared translation resources and mobile-first UI foundation

## Next recommended steps
1. Replace in-memory services with EF Core + SQL Server persistence and migrations.
2. Add ASP.NET Core Identity/JWT bearer integration and secure OTP provider wiring.
3. Connect Angular services to live API endpoints.
4. Add bulk question import, media upload pipeline, and descriptive answer evaluation workflows.
5. Add CI secrets, deployment environments, and production-grade observability.
