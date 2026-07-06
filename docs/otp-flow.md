# OTP flow and implementation notes

This document describes the OTP (WhatsApp/SMS) flow used in the FutureDrive MVP and the sample backend implementation included in backend/.

Sequence (booking confirmation -> OTP check-in):
1. Booking confirmed server-side -> generate 6-digit OTP with TTL (default 5 minutes).
2. Attempt to send OTP via WhatsApp Business API using pre-approved template. If provider returns failure or accounts not enabled, fallback to SMS.
3. Save otp_logs entry with phone, otp, method (whatsapp/sms), provider, provider_status and expires_at.
4. Driver requests OTP input at trip start. Server verifies OTP against latest sent and checks expiry and used status.
5. On successful verification, mark otp_logs.provider_status = 'used' and allow booking status transition to STARTED.

WhatsApp Business API notes:
- You must register a WhatsApp Business account with a BSP and get templates approved before sending OTP templates.
- Costs and opt-in rules apply; implement fallback to SMS for reliability.

Security & fraud mitigations:
- Rate-limit OTP sends per phone and per IP.
- Limit OTP resends (e.g., max 3 per hour).
- Record device/user agent metadata when sending and verifying OTP for auditing.

Files in this commit:
- backend/src/services/otpService.js -> implementation using pg and mock providers
- backend/src/routes/auth.js -> endpoints /auth/send-otp and /auth/verify-otp
- migrations/001_create_otp_logs.sql -> DB migration for otp_logs
- docs/otp-flow.md -> this doc

