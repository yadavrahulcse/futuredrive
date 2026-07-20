# Prioritized Backlog — Online Exam Platform MVP

Priority legend:
- P0 = must-have for MVP
- P1 = near-term release
- P2 = later enhancement

## Epic A — Identity, Access, and Student Onboarding
- **A1: Mobile OTP sign-in and registration** (P0)
  - Students and admins can sign in with Indian mobile numbers and language preference.
- **A2: Role-based access** (P0)
  - Student, Admin, and SuperAdmin roles gate UI and API modules.
- **A3: Consent and profile capture** (P1)
  - Registration stores consent, category interests, and preferred language.

## Epic B — Exam Catalog and Discovery
- **B1: Competitive exam categories** (P0)
  - UPSC, SSC, Banking, Railway, JEE, NEET, State PSC categories browseable by users.
- **B2: Exam and test series listing** (P0)
  - Users can browse free and paid series with schedule, language, and subject breakdown.
- **B3: Search and filters** (P1)
  - Filter by subject, difficulty, language, and category.

## Epic C — Question Bank Management
- **C1: Admin question builder** (P0)
  - Admin can create MCQ, MSQ, true/false, fill blank, integer, descriptive, assertion-reasoning, match, and sequence questions.
- **C2: Media and explanation support** (P0)
  - Questions and explanations support image and audio attachments.
- **C3: Translation-aware authoring** (P0)
  - Admin enters multilingual text side-by-side.
- **C4: Bulk import** (P1)
  - CSV/Excel import with validation preview.

## Epic D — Test Series Builder
- **D1: Compose test series** (P0)
  - Admin selects questions, sections, sequence, duration, and marking rules.
- **D2: Schedule availability** (P1)
  - Test series release windows and access controls.
- **D3: Randomization controls** (P1)
  - Shuffle questions/options per attempt with deterministic audit trail.

## Epic E — Student Exam Experience
- **E1: Start and resume attempt** (P0)
  - Student starts scheduled test and resumes while time remains.
- **E2: Responsive attempt screen** (P0)
  - Timer, question palette, mark for review, language toggle, and mobile-friendly layout.
- **E3: Auto-save and auto-submit** (P0)
  - Answers persist during attempt and submit on timeout.
- **E4: Tab-switch logging** (P1)
  - Anti-cheat signal stored for audit.

## Epic F — Evaluation and Results
- **F1: Objective scoring** (P0)
  - MCQ, MSQ, true/false, fill blank, and integer questions auto-score with negative marking.
- **F2: Result dashboard** (P0)
  - Score, accuracy, section performance, and answer explanations shown after submission.
- **F3: Rank and percentile** (P1)
  - Test-series level ranking analytics.
- **F4: Manual review workflow** (P1)
  - Descriptive questions queue for evaluator review.

## Epic G — Admin Analytics and Operations
- **G1: Admin overview dashboard** (P0)
  - Counts for exams, questions, attempts, and completion rate.
- **G2: Question analytics** (P1)
  - Difficulty, accuracy, and time-spent heatmaps.
- **G3: Audit logs** (P1)
  - OTP activity, tab-switch events, and test publication actions.

## Epic H — Platform and Compliance
- **H1: PWA support** (P0)
  - Installable app shell and offline asset caching.
- **H2: India-first localization** (P0)
  - English and Hindi MVP; extensible translation model for more Indian languages.
- **H3: Security baseline** (P0)
  - Short-lived sessions, refresh tokens, rate limits, consent tracking, and secure media delivery.
- **H4: DevOps pipeline** (P1)
  - Build, test, and publish workflows for API and web app.
