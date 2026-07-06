const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const OTP_TTL_SECONDS = parseInt(process.env.OTP_TTL_SECONDS || '300', 10); // 5 minutes
const OTP_LENGTH = 6;
const JWT_SECRET = process.env.JWT_SECRET || 'change-me';

function generateOtp(length = OTP_LENGTH) {
  const max = Math.pow(10, length);
  return String(Math.floor(Math.random() * max)).padStart(length, '0');
}

async function mockSendWhatsApp(phone, template, variables) {
  // Replace with real BSP integration (360dialog, Gupshup, Twilio).
  // This mock simulates success 70% of the time.
  if (Math.random() < 0.7) return { ok: true, provider: 'whatsapp-mock' };
  return { ok: false, provider: 'whatsapp-mock', error: 'bsp-failed' };
}

async function mockSendSms(phone, text) {
  // Simulate SMS provider call; success 90% of time.
  if (Math.random() < 0.9) return { ok: true, provider: 'sms-mock' };
  return { ok: false, provider: 'sms-mock', error: 'sms-failed' };
}

async function saveOtpLog(client, bookingId, phone, otp, method, providerResult) {
  const id = uuidv4();
  await client.query(
    `INSERT INTO otp_logs(id, booking_id, phone, otp, method, provider, provider_status, sent_at, expires_at)
     VALUES($1,$2,$3,$4,$5,$6,$7,now(), now() + ($8 || '0 second')::interval)`,
    [id, bookingId || null, phone, otp, method, providerResult.provider, providerResult.ok ? 'sent' : 'failed', `${OTP_TTL_SECONDS} seconds`]
  );
  return id;
}

module.exports.sendOtp = async function sendOtp(phone, viaPreferred) {
  const client = await pool.connect();
  try {
    const otp = generateOtp();
    // Try WhatsApp unless explicit sms requested
    let method = 'whatsapp';
    let providerResult = { ok: false, provider: 'none' };

    if (viaPreferred === 'sms') {
      method = 'sms';
      providerResult = await mockSendSms(phone, `Your FutureDrive OTP is ${otp}`);
    } else {
      providerResult = await mockSendWhatsApp(phone, 'otp_template', { otp });
      if (!providerResult.ok) {
        // fallback to SMS
        method = 'sms';
        providerResult = await mockSendSms(phone, `Your FutureDrive OTP is ${otp}`);
      }
    }

    await client.query('BEGIN');
    await saveOtpLog(client, null, phone, otp, method, providerResult);
    await client.query('COMMIT');

    return { success: true, method: method, provider: providerResult.provider };
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    throw err;
  } finally {
    client.release();
  }
};

module.exports.verifyOtp = async function verifyOtp(phone, otp) {
  const client = await pool.connect();
  try {
    // find matching otp that is not expired and not used
    const res = await client.query(
      `SELECT id, otp, expires_at FROM otp_logs WHERE phone = $1 AND otp = $2 AND provider_status = 'sent' ORDER BY sent_at DESC LIMIT 1`,
      [phone, otp]
    );
    if (res.rows.length === 0) return null;
    const row = res.rows[0];
    const nowRes = await client.query('SELECT now() as now');
    const now = nowRes.rows[0].now;
    if (row.expires_at < now) return null;

    // mark otp as used (provider_status -> used)
    await client.query('UPDATE otp_logs SET provider_status = $1 WHERE id = $2', ['used', row.id]);

    // create or fetch user, then issue JWT
    const userRes = await client.query('SELECT id FROM users WHERE phone = $1', [phone]);
    let userId;
    if (userRes.rows.length === 0) {
      const insertRes = await client.query('INSERT INTO users(phone, language, created_at) VALUES($1,$2,now()) RETURNING id', [phone, 'en']);
      userId = insertRes.rows[0].id;
    } else {
      userId = userRes.rows[0].id;
    }

    const token = jwt.sign({ sub: userId, phone }, JWT_SECRET, { expiresIn: '30d' });
    return { token, expires_in: 30 * 24 * 3600 };
  } finally {
    client.release();
  }
};
