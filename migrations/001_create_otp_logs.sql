-- Migration: create otp_logs with required columns

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS otp_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id BIGINT NULL,
  phone VARCHAR(30) NOT NULL,
  otp VARCHAR(10) NOT NULL,
  method VARCHAR(20) NOT NULL,
  provider VARCHAR(100),
  provider_status VARCHAR(20) NOT NULL DEFAULT 'sent', -- sent, failed, used
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_otp_phone ON otp_logs(phone);
CREATE INDEX IF NOT EXISTS idx_otp_sent_at ON otp_logs(sent_at);

-- retention policy note (run as scheduled job): delete from otp_logs where sent_at < now() - interval '90 days';
