# Prioritized Backlog — MVP-first

This backlog is organized as Epics → User Stories → Acceptance Criteria, prioritized for an MVP launch in the Neemrana/Behror corridor.

Priority legend:
- P0 = must-have for MVP
- P1 = important for near-term releases
- P2 = nice-to-have

Story points: Fibonacci scale (1,2,3,5,8)

---

Epic A — User Onboarding & Authentication
- A1: Mobile number + OTP registration / login (P0, 3)
  - Acceptance: user can enter phone → receive OTP via SMS/WhatsApp → verify → account created. Duplicate phone blocked. Session JWT returned.
- A2: Email signup & basic profile (P1, 3)
  - Acceptance: signup by email + password; profile edit; email verification optional for MVP.
- A3: Multi-language (Hindi/English) login screens (P0, 2)
  - Acceptance: language toggle persisted; all auth flows appear in chosen language.

Epic B — Passenger Ride Request Flow
- B1: Create ride request (pickup, drop, preferences) (P0, 3)
  - Acceptance: passenger enters coordinates or address, optional notes; request persisted; UI shows “searching for quotes”.
- B2: Show ETA & map preview (P0, 2)
  - Acceptance: show approximate ETA of nearest drivers; map centered and shareable.
- B3: Request validation + error handling (P0, 1)
  - Acceptance: invalid/empty addresses blocked; user-friendly errors in selected language.

Epic C — Driver Quote Submission & Listing
- C1: Drivers view incoming request & submit custom quote (P0, 5)
  - Acceptance: driver receives request notification, submits fare, ETA, vehicle details; quote recorded with timestamp.
- C2: Passenger sees all quotes sorted (price/rating/ETA filters) (P0, 3)
  - Acceptance: passenger can sort/filter and view driver profile + vehicle details and rating before choosing.
- C3: Quote expiry/timeout (P0, 1)
  - Acceptance: quote expires after configured TTL (e.g., 2 minutes) and is hidden.

Epic D — Driver Selection & Booking Confirmation
- D1: Passenger selects quote → booking locked (P0, 3)
  - Acceptance: once selected, other drivers notified that booking taken; booking status = PENDING_DRIVER_CONFIRMATION or CONFIRMED per flow.
- D2: Driver accepts/fails to accept within TTL (P0, 2)
  - Acceptance: driver must accept within configured time; if not, driver auto‑rejected and passenger offered alternatives.
- D3: Notifications for both parties (P0, 1)
  - Acceptance: push + in‑app + WhatsApp/SMS confirmation templates sent.

Epic E — Payments (UPI only)
- E1: UPI flow integration (P0, 8)
  - Acceptance: passenger can complete UPI payment flow (app intent / deep link or UPI collect); transaction recorded; booking marked PAID or PAYMENT_PENDING with reconciled status.
  - Note: For MVP, sandbox / mock UPI ok if production credentials unavailable.
- E2: Transaction receipts & reconciliation (P0, 2)
  - Acceptance: passenger and driver receive receipt; admin ledger reflects commission deduction.

Epic F — OTP Check‑in & WhatsApp OTP
- F1: Generate and send OTP to passenger when booking confirmed (P0, 3)
  - Acceptance: 6-digit OTP generated, TTL (e.g., 5 mins), delivered via WhatsApp Business API (preferred) and fallback SMS if WhatsApp fails; logs stored.
- F2: Driver verifies OTP at trip start (P0, 2)
  - Acceptance: driver app prompts for OTP entry; only on correct OTP and within TTL can ride status change to STARTED.
- F3: OTP resend, retries, and limits (P1, 1)
  - Acceptance: max 3 resends; rate-limited; device fingerprint/logging for fraud detection.

Epic G — Indirect Communication & Safety
- G1: In‑app mediated chat between driver and passenger routed through office / proxy (P0, 5)
  - Acceptance: messages go via server; real phone numbers are never exposed; logs retained for moderation; message delivery + read receipts implemented.
- G2: Masked call/VoIP option (P1, 8)
  - Acceptance: when necessary, system provides masked number or in‑app softphone connecting user & driver through SIP/VoIP with time-limited bridge.
- G3: SOS button & emergency flow (P0, 3)
  - Acceptance: SOS triggers alert to admin with last known GPS, auto‑share to emergency contact and optional police number; admin can escalate.

Epic H — Cancellations & Alternatives
- H1: Passenger cancels before driver starts; alternatives suggested (P0, 3)
  - Acceptance: cancellation screen shows reason; compute cancellation fee rules; show ranked alternative drivers (ETA, fare, rating).
- H2: Driver cancels after acceptance; passenger auto‑offered alternatives (P0, 2)
  - Acceptance: replacement driver suggestions displayed; refunds/credits handled automatically per policy.
- H3: Cancellation analytics & dispute flagging (P1, 2)
  - Acceptance: frequent cancellations flagged for review; admin dashboard surfaces problem drivers/passengers.

Epic I — Driver Onboarding & KYC
- I1: Driver signup + document upload (license, RC, Aadhaar) (P0, 5)
  - Acceptance: driver can upload images; system validates file types and metadata; status set to PENDING_VERIFICATION.
- I2: Admin KYC workflow + police verification status (P1, 3)
  - Acceptance: admin can mark KYC stages (uploaded, verified, rejected); rejected drivers cannot accept rides.
- I3: Verified badge & profile (P0, 1)
  - Acceptance: verified drivers display badge; badges reflect police check + docs.

Epic J — Admin Dashboard & Analytics
- J1: Admin view: rides, drivers, users, disputes (P0, 5)
  - Acceptance: filterable list, CSV export, basic KPI tiles (daily rides, revenue, active drivers).
- J2: Commission configuration & payout ledger (P0, 3)
  - Acceptance: admin sets commission (flat/%), dashboard shows driver gross, commission, net payout.
- J3: OTP / messaging audit logs (P1, 2)
  - Acceptance: admin can view OTP send logs, chat transcripts, flagged SOS events.

Epic K — Localization, UI & Usability
- K1: i18n resource files (EN + HI) for core flows (P0, 2)
  - Acceptance: all user-facing strings in backlog use keys; Hindi translations provided for MVP screens.
- K2: Phone number and date/time locale handling (P0, 1)
  - Acceptance: number formatting, 24/12h display, and localization toggles work for EN/HI.

Epic L — Non‑Functional Requirements & Security
- L1: Authentication & encrypted data transport (P0, 3)
  - Acceptance: TLS everywhere; JWT session management with refresh; sensitive fields encrypted at rest.
- L2: Rate limiting, fraud detection hooks (P1, 3)
  - Acceptance: suspicious patterns (high resends/cancellations) create flags and block flows.
- L3: Monitoring & alerts (P0, 2)
  - Acceptance: basic Prometheus/Grafana or hosted APM setup, alert on error rate and payment failures.

MVP Release Composition (recommended)
- Sprint 1 (MVP Core): A1, A3, B1, C1, C2, D1, D2, F1 (OTP generation), G1 (mediated messaging minimal), E2 (receipt mock)
- Sprint 2: E1 (mock/real UPI), F2 (OTP check-in), H1/H2 (cancellations + alternatives), I1 (driver doc upload)
- Sprint 3: J1 (admin basic), L1/L3 (security + monitoring), K1 (i18n), WhatsApp Business integration production setup

Key acceptance details to include in each issue when creating:
- API endpoints required and example request/response
- DB entities affected (e.g., bookings, quotes, otp_logs)
- UI states & wireframe reference (e.g., booking list, quote card)
- Edge cases (timeouts, retries, network failures)
- Test cases (unit + e2e) and manual QA checklist
- GDPR/India data retention: retention period for OTPs, chat transcripts, and KYC docs

Immediate risks & notes (must track as separate issues)
- WhatsApp Business API: template approval and BSP costs; fallback SMS plan required.
- UPI integration: bank/PSP onboarding and testing; reconciliation complexity.
- KYC/police verification: offline process + SLA for verification; need admin tooling.
- Indirect contact/VoIP: privacy and telecom compliance (DND rules, call recording laws).
- OTP fraud: consider device binding + rate limits; log IP/device for audit.
- Commission & refunds: legal/tax/invoice flows (GST) must be validated.

