# Software Requirement Specification (SRS)

## Project Title
Bharat Competitive Exam Platform

## Objective
Build a progressive web application for conducting online competitive exams in India across multiple categories, languages, and device sizes.

## Target Users
- Students preparing for Indian competitive exams
- Coaching institutes and content administrators
- Platform super administrators and evaluators

## Supported Exam Categories
- UPSC / Civil Services
- SSC
- Banking
- Railway
- JEE
- NEET
- State Public Service Commissions
- Other custom categories configured by admins

## Functional Requirements

### 1. Authentication and User Management
- OTP-based login for Indian mobile numbers
- Student, Admin, and SuperAdmin roles
- Language preference persistence
- Consent capture and audit trail

### 2. Exam Catalog
- Category and subject browsing
- Exam detail page with duration, marks, schedule, and supported languages
- Test-series discovery for free and premium content

### 3. Question Bank
- Support question types: MCQ, MSQ, True/False, Fill Blank, Integer, Descriptive, Assertion-Reasoning, Match, Sequence
- Support question media: image and audio
- Explanation text and explanation media
- Tagging, difficulty, and subject mapping
- Multilingual question text and options

### 4. Test Series Administration
- Create and manage exams and test series
- Set sections, duration, marks, and negative marking ratios
- Schedule release windows
- Control free vs premium tests

### 5. Student Exam Experience
- Start, resume, and submit timed attempts
- Question palette with answered, marked, and pending indicators
- Auto-save answers and submit on timeout
- Mobile, tablet, and desktop responsive layout
- Language switching during review where translations exist

### 6. Evaluation and Results
- Auto-evaluation for objective question types
- Manual evaluation workflow for descriptive responses
- Result card with score, accuracy, and subject analysis
- Explanation review after submission
- Rank and percentile support

### 7. Admin Analytics
- Dashboard for exams, questions, attempts, and completion rate
- Question-level performance analytics
- Monitoring for tab-switch, suspicious activity, and OTP usage

## Non-Functional Requirements
- PWA installability and offline asset caching
- SQL Server-compatible schema for production persistence
- ASP.NET Core backend and Angular frontend
- Mobile-first UI with support for tablet and desktop
- Extensible localization architecture for multiple Indian languages
- Security baseline for JWT/refresh tokens, rate limiting, and consent handling

## Compliance Notes
- India-focused hosting and data retention policies
- DPDP-friendly consent and data deletion workflow support
- Secure media storage and controlled access to exam assets
