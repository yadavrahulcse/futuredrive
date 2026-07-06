-- Initial SQL schema for FutureDrive (Postgres)
-- Note: adapt types and constraints for your DB and extensions (uuid, etc.)

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  phone VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(254),
  name VARCHAR(200),
  language VARCHAR(10) DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE drivers (
  id BIGSERIAL PRIMARY KEY,
  phone VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(200),
  vehicle_number VARCHAR(50),
  vehicle_model VARCHAR(100),
  rating NUMERIC(2,1) DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  kyc_status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE driver_docs (
  id BIGSERIAL PRIMARY KEY,
  driver_id BIGINT REFERENCES drivers(id) ON DELETE CASCADE,
  doc_type VARCHAR(50),
  file_path TEXT,
  reviewed_by BIGINT,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  status VARCHAR(50) DEFAULT 'uploaded'
);

CREATE TABLE rides (
  id BIGSERIAL PRIMARY KEY,
  passenger_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  pickup_lat DOUBLE PRECISION,
  pickup_lng DOUBLE PRECISION,
  drop_lat DOUBLE PRECISION,
  drop_lng DOUBLE PRECISION,
  status VARCHAR(50) DEFAULT 'requested', -- requested, quoted, confirmed, started, completed, cancelled
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE quotes (
  id BIGSERIAL PRIMARY KEY,
  ride_id BIGINT REFERENCES rides(id) ON DELETE CASCADE,
  driver_id BIGINT REFERENCES drivers(id) ON DELETE SET NULL,
  amount NUMERIC(10,2) NOT NULL,
  eta_minutes INTEGER,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE bookings (
  id BIGSERIAL PRIMARY KEY,
  ride_id BIGINT REFERENCES rides(id) ON DELETE CASCADE,
  quote_id BIGINT REFERENCES quotes(id) ON DELETE SET NULL,
  driver_id BIGINT REFERENCES drivers(id) ON DELETE SET NULL,
  passenger_paid BOOLEAN DEFAULT false,
  payment_id BIGINT,
  status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, started, completed, cancelled
  otp_code VARCHAR(10),
  otp_expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE payments (
  id BIGSERIAL PRIMARY KEY,
  booking_id BIGINT REFERENCES bookings(id) ON DELETE SET NULL,
  amount NUMERIC(10,2),
  provider VARCHAR(100),
  provider_transaction_id VARCHAR(200),
  status VARCHAR(50), -- pending, success, failed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE otp_logs (
  id BIGSERIAL PRIMARY KEY,
  booking_id BIGINT REFERENCES bookings(id) ON DELETE CASCADE,
  phone VARCHAR(20),
  otp VARCHAR(10),
  method VARCHAR(20), -- whatsapp, sms
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  booking_id BIGINT REFERENCES bookings(id) ON DELETE CASCADE,
  sender_type VARCHAR(20), -- passenger, driver, system
  sender_id BIGINT,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE admin_logs (
  id BIGSERIAL PRIMARY KEY,
  event_type VARCHAR(100),
  event_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Indexes
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_drivers_phone ON drivers(phone);
CREATE INDEX idx_rides_status ON rides(status);
CREATE INDEX idx_bookings_status ON bookings(status);
