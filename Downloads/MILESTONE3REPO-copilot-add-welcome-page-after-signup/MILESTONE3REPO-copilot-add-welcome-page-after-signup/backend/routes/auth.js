const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken');
const { sendOTP } = require('../utils/smsService');

const router = express.Router();

// Helper function to generate 5-digit OTP using cryptographically secure random
function generateOTP() {
  return crypto.randomInt(10000, 100000).toString();
}

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  const { username, email, password, phoneNumber } = req.body;
  if (!username || !email || !password || !phoneNumber)
    return res.status(400).json({ message: 'All fields are required' });

  try {
    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing)
      return res.status(409).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ 
      username, 
      email, 
      password: hashedPassword, 
      phoneNumber,
      mfaEnabled: true 
    });
    await user.save();

    // Don't issue token yet - user needs to login with MFA
    res.status(201).json({ 
      username: user.username, 
      email: user.email,
      message: 'Account created successfully. Please login to continue.' 
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(400).json({ message: 'Invalid credentials' });

    // Generate OTP for MFA
    const otp = generateOTP();
    const hashedOTP = await bcrypt.hash(otp, 10);
    
    // Store hashed OTP and expiration (5 minutes from now)
    user.mfaCodeHash = hashedOTP;
    user.mfaExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    await user.save();

    // Send OTP via SMS
    const smsResult = await sendOTP(user.phoneNumber, otp);
    
    if (!smsResult.success) {
      return res.status(500).json({ 
        message: 'Failed to send OTP. Please try again.' 
      });
    }

    // Return success - user needs to verify OTP
    res.json({ 
      message: 'OTP sent to your phone',
      requiresOTP: true,
      userId: user._id 
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/verify-otp
router.post('/verify-otp', async (req, res) => {
  const { userId, otp } = req.body;
  
  if (!userId || !otp)
    return res.status(400).json({ message: 'User ID and OTP are required' });

  try {
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: 'User not found' });

    // Check if OTP exists
    if (!user.mfaCodeHash || !user.mfaExpiresAt)
      return res.status(400).json({ message: 'No OTP request found. Please login again.' });

    // Check if OTP has expired
    if (new Date() > user.mfaExpiresAt) {
      // Clear expired OTP
      user.mfaCodeHash = undefined;
      user.mfaExpiresAt = undefined;
      await user.save();
      return res.status(400).json({ message: 'OTP has expired. Please login again.' });
    }

    // Verify OTP
    const isValid = await bcrypt.compare(otp, user.mfaCodeHash);
    if (!isValid)
      return res.status(400).json({ message: 'Invalid OTP' });

    // Clear OTP fields after successful verification
    user.mfaCodeHash = undefined;
    user.mfaExpiresAt = undefined;
    await user.save();

    // Issue JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ 
      token, 
      username: user.username,
      message: 'Authentication successful' 
    });
  } catch (err) {
    console.error('OTP verification error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/auth/me
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('username email');
    if (!user)
      return res.status(404).json({ message: 'User not found' });

    res.json({ username: user.username, email: user.email });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
