# Twilio SMS Setup Guide - Send Real OTP to Phone Numbers

This guide explains how to configure your MFA system to send real SMS messages via Twilio instead of logging OTPs to the console.

## Overview

Currently, your system is in **development mode** with `TWILIO_ENABLED=false`, which logs OTPs to the backend console. To send real SMS messages, you need to:

1. Create a Twilio account
2. Get your Twilio credentials
3. Configure the backend environment
4. Test with real phone numbers

---

## Step 1: Create Twilio Account

### 1.1 Sign Up for Twilio

1. Go to [https://www.twilio.com/try-twilio](https://www.twilio.com/try-twilio)
2. Click "Sign up and start building"
3. Fill in your details:
   - Email address
   - First and Last name
   - Password
4. Verify your email address
5. **Verify your phone number** (Twilio will send you a verification code)

### 1.2 Complete Onboarding

1. Answer the onboarding questions:
   - What do you want to do? Select **"Send messages with SMS, WhatsApp, etc"**
   - What's your preferred language? Select **JavaScript**
   - What's your goal? Select **"Build an app"** or **"Use Twilio in my job"**

2. Skip the tutorial (you already have the code implemented)

---

## Step 2: Get Your Twilio Credentials

### 2.1 Get Account SID and Auth Token

1. After logging in, you'll be on the Twilio Console Dashboard
2. Look for the **"Account Info"** panel on the right side
3. You'll see:
   - **Account SID**: Starts with "AC..." (e.g., `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
   - **Auth Token**: Click "Show" to reveal it
   
**Important:** Keep these credentials secret! Never commit them to Git.

### 2.2 Get a Phone Number

#### Option A: Trial Account (Free)

1. Click **"Get a Trial Number"** button on the dashboard
2. Twilio will assign you a free phone number (e.g., `+15551234567`)
3. Click **"Choose this number"**

**Trial Account Limitations:**
- Can only send SMS to **verified phone numbers**
- All SMS will have a prefix: "Sent from your Twilio trial account - "
- Limited to a few test numbers

#### Option B: Upgrade to Paid Account (Recommended for Production)

1. Click **"Upgrade"** in the top navigation
2. Add a payment method (credit card)
3. Purchase a phone number:
   - Go to **Phone Numbers** → **Manage** → **Buy a number**
   - Select your country
   - Choose "SMS" capability
   - Search and purchase a number (~$1-2/month)

**Paid Account Benefits:**
- Send SMS to any phone number
- No trial message prefix
- More SMS credits

---

## Step 3: Verify Phone Numbers (Trial Account Only)

If you're using a **trial account**, you must verify any phone number you want to send SMS to:

1. Go to **Phone Numbers** → **Manage** → **Verified Caller IDs**
2. Click **"Add a new Caller ID"**
3. Enter your phone number (e.g., `+1234567890`)
4. Select "Text you instead" (SMS verification)
5. Enter the verification code sent to your phone
6. Repeat for any other phone numbers you want to test with

---

## Step 4: Configure Backend Environment

### 4.1 Update `.env` File

Navigate to your backend directory and edit the `.env` file:

```bash
cd Downloads/MILESTONE3REPO-copilot-add-welcome-page-after-signup/MILESTONE3REPO-copilot-add-welcome-page-after-signup/backend
nano .env
```

Update the Twilio configuration:

```env
MONGO_URI="mongodb://localhost:27017/it340db"
JWT_SECRET=mysupersecretkey
PORT=5000
HOST=0.0.0.0

# Twilio Configuration - PRODUCTION MODE
TWILIO_ENABLED=true
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_actual_auth_token_here
TWILIO_PHONE_NUMBER=+15551234567
```

**Replace with your actual values:**
- `TWILIO_ACCOUNT_SID`: Your Account SID from Twilio console
- `TWILIO_AUTH_TOKEN`: Your Auth Token from Twilio console
- `TWILIO_PHONE_NUMBER`: Your Twilio phone number (with country code)

**Important:** Make sure `TWILIO_ENABLED=true` to enable SMS sending!

### 4.2 Save the File

Press `Ctrl + X`, then `Y`, then `Enter` to save.

---

## Step 5: Restart Backend Server

The backend needs to reload the new environment variables:

1. Stop the backend server (press `Ctrl + C` in the terminal running `node server.js`)

2. Start it again:
   ```bash
   node server.js
   ```

3. You should see:
   ```
   Server running on http://0.0.0.0:5000
   MongoDB connected
   ```

---

## Step 6: Test SMS Sending

### 6.1 Register with Real Phone Number

1. Open your browser to `http://localhost:8080/create-account`

2. Fill in the form with a **real phone number**:
   - Full Name: Your Name
   - Email: your.email@example.com
   - **Phone Number: +1234567890** (your actual number with country code)
   - Password: your_password
   - Confirm Password: your_password

3. Click "Create Account"

**Phone Number Format:**
- Include country code (e.g., `+1` for US/Canada, `+44` for UK)
- Remove spaces, dashes, parentheses
- Examples:
  - ✅ `+15551234567`
  - ✅ `+447911123456`
  - ❌ `555-123-4567` (missing country code)
  - ❌ `+1 (555) 123-4567` (has spaces and parentheses)

### 6.2 Login and Receive SMS

1. Go to `http://localhost:8080/login`

2. Enter your credentials and click "Sign In"

3. **Check your phone!** You should receive an SMS like:
   ```
   Your verification code is: 12345. This code expires in 5 minutes.
   ```
   
   (Trial accounts will have a prefix: "Sent from your Twilio trial account - ")

4. Enter the 5-digit code on the OTP verification page

5. Click "Verify OTP"

6. You should be authenticated and redirected to the welcome page

### 6.3 Verify Backend Logs

The backend console should show:
```
SMS sent to +15551234567
```

Instead of the local test mode message with the OTP visible.

---

## Troubleshooting

### Error: "Unable to create record: Unverified numbers"

**Problem:** You're using a trial account and the phone number isn't verified.

**Solution:** 
1. Go to Twilio Console → **Verified Caller IDs**
2. Add and verify the phone number
3. Try again

### Error: "Authentication failed"

**Problem:** Your Account SID or Auth Token is incorrect.

**Solution:**
1. Double-check credentials in Twilio Console
2. Make sure there are no extra spaces in `.env` file
3. Restart the backend server after changing `.env`

### Error: "The number +1234567890 is not a valid phone number"

**Problem:** Phone number format is incorrect.

**Solution:**
- Include country code (e.g., `+1` for US)
- Remove all spaces, dashes, and parentheses
- Use format: `+[country_code][number]`

### SMS Not Received

**Check:**
1. Is the phone number correct in the database?
   ```bash
   mongosh
   use it340db
   db.users.find().pretty()
   ```

2. Check Twilio SMS logs:
   - Go to Twilio Console → **Monitor** → **Logs** → **Messaging**
   - Look for your SMS and its status

3. Verify you have SMS credits:
   - Trial accounts have limited credits
   - Check balance in Twilio Console

### "Failed to send OTP" Error

**Check:**
1. Backend console for detailed error message
2. Verify `TWILIO_ENABLED=true` in `.env`
3. Check Twilio credentials are correct
4. Ensure backend was restarted after `.env` changes

---

## Cost Information

### Trial Account
- **Free credits**: ~$15 USD (enough for 100+ SMS in US)
- **SMS cost**: $0.0075 per message (US/Canada)
- **Phone number**: Free trial number
- **Limitation**: Only verified numbers

### Paid Account
- **Phone number**: ~$1-2/month
- **SMS cost**: 
  - US/Canada: $0.0079 per message
  - International: Varies by country (check [Twilio pricing](https://www.twilio.com/sms/pricing))
- **No limitations**: Send to any number

### Cost Example
- 100 OTP SMS/month = ~$0.79
- Phone number rental = ~$1.50/month
- **Total**: ~$2.29/month for 100 authentications

---

## Security Best Practices

### 1. Protect Credentials

**Never commit `.env` to Git!** 

The `.gitignore` file already excludes it:
```
.env
*/.env
```

### 2. Use Environment Variables in Production

For production deployment (e.g., Heroku, AWS, Azure):

1. Set environment variables through the hosting platform's dashboard
2. Never hardcode credentials in source code

**Example (Heroku):**
```bash
heroku config:set TWILIO_ENABLED=true
heroku config:set TWILIO_ACCOUNT_SID=ACxxxx
heroku config:set TWILIO_AUTH_TOKEN=your_token
heroku config:set TWILIO_PHONE_NUMBER=+15551234567
```

### 3. Monitor Usage

1. Set up usage alerts in Twilio Console
2. Monitor SMS logs for suspicious activity
3. Implement rate limiting (recommended for production)

---

## Switching Between Modes

### Development Mode (Console Logging)
```env
TWILIO_ENABLED=false
```
- OTPs logged to console
- No SMS sent
- No Twilio charges

### Production Mode (Real SMS)
```env
TWILIO_ENABLED=true
TWILIO_ACCOUNT_SID=ACxxxx
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=+15551234567
```
- Real SMS sent via Twilio
- Charges apply per SMS

**Tip:** Keep `TWILIO_ENABLED=false` during development to avoid charges, then switch to `true` for demos and production.

---

## Quick Reference Commands

```bash
# Edit .env file
cd backend
nano .env

# Restart backend
# (Ctrl+C to stop, then:)
node server.js

# Check MongoDB for user phone numbers
mongosh
use it340db
db.users.find({}, {email: 1, phoneNumber: 1}).pretty()
exit

# View Twilio credentials (from .env)
cat backend/.env | grep TWILIO
```

---

## Next Steps

1. ✅ Create Twilio account
2. ✅ Get credentials and phone number
3. ✅ Update `.env` with real credentials
4. ✅ Set `TWILIO_ENABLED=true`
5. ✅ Restart backend server
6. ✅ Test with your real phone number
7. ✅ Monitor Twilio logs for success

**You're all set to send real SMS OTPs!** 🎉

For more help:
- Twilio Documentation: https://www.twilio.com/docs/sms
- Twilio Support: https://support.twilio.com
- Pricing: https://www.twilio.com/sms/pricing
