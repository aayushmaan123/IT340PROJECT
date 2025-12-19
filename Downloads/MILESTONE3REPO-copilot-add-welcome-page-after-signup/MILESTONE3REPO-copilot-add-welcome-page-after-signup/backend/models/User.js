// User model for MongoDB using Mongoose
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password
  phoneNumber: { type: String, required: true }, // Phone number for SMS MFA
  mfaCodeHash: { type: String }, // Hashed OTP for phone-based MFA
  mfaExpiresAt: { type: Date }, // OTP expiration timestamp
  mfaEnabled: { type: Boolean, default: true } // MFA enabled flag
});

module.exports = mongoose.model('User', userSchema);