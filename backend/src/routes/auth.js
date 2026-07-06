const express = require('express');
const router = express.Router();
const otpService = require('../services/otpService');

// Send OTP (WhatsApp preferred, fallback SMS)
router.post('/send-otp', async (req, res) => {
  const { phone, via } = req.body;
  if (!phone) return res.status(400).json({ error: 'phone is required' });
  try {
    const result = await otpService.sendOtp(phone, via);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to send otp' });
  }
});

// Verify OTP and issue JWT session
router.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) return res.status(400).json({ error: 'phone and otp required' });
  try {
    const session = await otpService.verifyOtp(phone, otp);
    if (!session) return res.status(401).json({ error: 'invalid or expired otp' });
    res.json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'verification failed' });
  }
});

module.exports = router;
