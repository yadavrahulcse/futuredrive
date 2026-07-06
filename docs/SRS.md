# Software Requirement Specification (SRS)

## Project Title
Quote‑Based Ride Booking Application (Autos & Cabs)

## Region of Launch
Neemrana/Behror corridor towards Gurgaon & Jaipur

## Target Audience
Individual users (Phase 1), expandable later

---

## 1. Objectives
- Provide a platform for booking autorickshaw and cab rides.
- Enable passengers to request rides and receive driver quotes.
- Allow passengers to select drivers based on fare, rating, and vehicle details.
- Ensure cashless transactions via UPI only.
- Build trust through strong safety and compliance measures.
- Support Hindi and English for accessibility.

---

## 2. Core Features
- Ride Request: Passenger enters pickup/drop location.
- Driver Quotes: Registered drivers submit fare quotes with vehicle info.
- Passenger Selection: Passenger chooses driver based on quote, rating, and car details.
- Booking Confirmation: Once accepted, booking is locked and notifications sent.
- Commission Model: Fixed commission deducted from driver payout.
- OTP Check‑in: Passenger must provide OTP to driver before ride starts.
- WhatsApp OTP: OTP delivered via WhatsApp when ride is confirmed.
- Cancellation with Alternatives: If passenger cancels, app suggests alternate drivers/options.
- Indirect Communication: Driver and passenger contact only via office/mediated channel (no direct phone sharing).

---

## 3. User Features
- Registration/login via mobile number or email.
- Request ride and view multiple driver quotes.
- Select preferred driver based on rating, fare, and vehicle.
- Pay via UPI only.
- OTP‑based check‑in before ride begins.
- WhatsApp OTP delivery for confirmations.
- Ride cancellation option with alternate suggestions.
- Rate/review driver after ride.
- Share trip details with contacts.
- SOS button for emergencies.
- Multi‑language support: Hindi & English.

---

## 4. Driver Features
- Register with KYC verification (license, RC, Aadhaar, police check).
- Respond to ride requests with custom fare quotes.
- Show verified profile (photo, vehicle details, rating).
- Receive commission‑adjusted payouts.
- Earnings dashboard.
- OTP validation before starting ride.
- Indirect communication with passengers (via office system).

---

## 5. Admin Features
- Dashboard to manage drivers, users, and bookings.
- Commission management (fixed % or flat fee).
- Analytics: ride count, revenue, active drivers.
- Dispute resolution and misconduct reporting.
- Safety alerts (flagged drivers, repeated SOS triggers).
- Manage OTP system (WhatsApp integration).
- Control indirect communication channel between driver and passenger.

---

## 6. Technical Requirements
- Platforms: Android, iOS, Web.
- Backend: Node.js/Java/Spring.
- Database: PostgreSQL/MySQL.
- Payment: UPI integration.
- Notifications: SMS + push + WhatsApp OTP.
- Security: Data encryption, secure login, privacy compliance.
- Communication: Indirect messaging system routed via admin office.

---

## 7. Safety & Compliance
- Driver Verification:
  - Mandatory KYC (license, RC, Aadhaar).
  - Police verification before activation.
  - Verified badge displayed in app.

- Passenger Safety:
  - Live GPS tracking with share option.
  - SOS button linked to emergency contacts and police helpline.
  - Auto‑share trip details (driver name, vehicle number, route).
  - Ratings & reviews visible before booking.
  - OTP check‑in ensures correct driver–passenger match.

- Platform Safety:
  - Encrypted UPI payments (no cash).
  - Fraud detection for fake accounts or repeated cancellations.
  - Data privacy compliance with Indian IT laws.

- Operational Safety:
  - Insurance coverage option for rides.
  - Driver onboarding training (etiquette + safety).
  - Geo‑fencing to restrict unsafe areas.
  - Admin alerts for unusual activity.

---

## 8. Non‑Functional Requirements
- Performance: Handle peak booking loads in industrial corridors.
- Scalability: Expandable to pan‑India operations.
- Reliability: 99.9% uptime.
- Usability: Simple bilingual UI (Hindi/English).
- Compliance: Transport regulations, GST invoicing.

---

## 9. Future Enhancements
- Expand to buses, trucks, and carpools.
- Corporate accounts for industries.
- Subscription models (monthly passes).
- AI‑based demand prediction for dynamic pricing.

---

