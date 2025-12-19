require('dotenv').config();

// SMS Service for sending OTP via Twilio
const sendOTP = async (phoneNumber, otp) => {
  const twilioEnabled = process.env.TWILIO_ENABLED === 'true';

  if (twilioEnabled) {
    // Send SMS using Twilio - import only when needed
    try {
      const twilio = require('twilio');
      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );

      await client.messages.create({
        body: `Your verification code is: ${otp}. This code expires in 5 minutes.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber
      });

      console.log(`SMS sent to ${phoneNumber}`);
      return { success: true };
    } catch (error) {
      console.error('Twilio SMS error:', error);
      return { success: false, error: error.message };
    }
  } else {
    // Fallback for local testing - log OTP to console
    console.log('='.repeat(50));
    console.log(`[LOCAL TEST MODE] OTP for ${phoneNumber}: ${otp}`);
    console.log('='.repeat(50));
    return { success: true };
  }
};

module.exports = { sendOTP };
