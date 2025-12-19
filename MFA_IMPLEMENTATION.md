# SMS-Based Multi-Factor Authentication (MFA) Implementation

## Overview
This implementation adds phone number-based SMS OTP authentication to the existing MERN stack e-commerce application.

## Features Implemented

### Backend (Node.js + Express + MongoDB)

#### 1. User Schema Updates
- Added `phoneNumber` field (required)
- Added `mfaCodeHash` field for storing hashed OTP
- Added `mfaExpiresAt` field for OTP expiration tracking
- Added `mfaEnabled` field (default: true)

#### 2. API Endpoints

**POST /api/auth/signup**
- Registers new users with username, email, password, and phone number
- Validates all required fields including phone number format
- Returns success message without JWT (user must login for MFA)

**POST /api/auth/login**
- Validates username/email and password
- Generates a random 5-digit numeric OTP
- Hashes OTP with bcrypt before storage
- Sets expiration time to 5 minutes
- Sends OTP via Twilio SMS or logs to console (if TWILIO_ENABLED=false)
- Returns `requiresOTP: true` and `userId` for next step

**POST /api/auth/verify-otp**
- Accepts `userId` and `otp` from user
- Validates OTP against hashed version in database
- Checks if OTP has expired
- Issues JWT token on successful verification
- Clears OTP fields after verification (success or expiration)

#### 3. SMS Service (Twilio Integration)
- Located in `backend/utils/smsService.js`
- Supports two modes:
  - **Production Mode** (`TWILIO_ENABLED=true`): Sends actual SMS via Twilio API
  - **Development Mode** (`TWILIO_ENABLED=false`): Logs OTP to console for local testing

#### 4. Environment Variables (.env)
```
TWILIO_ENABLED=false               # Set to true for production
TWILIO_ACCOUNT_SID=your_sid_here
TWILIO_AUTH_TOKEN=your_token_here
TWILIO_PHONE_NUMBER=your_number_here
```

### Frontend (React + TypeScript + Vite)

#### 1. CreateAccount Page Updates
- Added phone number input field with validation
- Phone number format validation (accepts formats like +1234567890)
- Updated signup flow to redirect to login after successful registration

#### 2. Login Page Updates
- Modified to handle OTP requirement response
- Redirects to OTP verification page after successful password authentication
- Passes `userId` to OTP verification page via navigation state

#### 3. New VerifyOTP Page
- Clean, responsive OTP input interface using `input-otp` library
- 5-digit OTP input with individual slots
- Real-time countdown timer (5 minutes)
- Error handling for:
  - Invalid OTP
  - Expired OTP
  - Missing or incomplete OTP
- Resend functionality (redirects to login)
- Auto-expiration when timer reaches zero
- JWT storage only after successful verification

#### 4. Routing
- Added `/verify-otp` route in App.tsx

## Security Features

1. **OTP Hashing**: OTPs are hashed using bcrypt before storage
2. **Time-based Expiration**: OTPs expire after 5 minutes
3. **One-time Use**: OTPs are cleared after successful verification or expiration
4. **Secure Password Storage**: Passwords remain hashed with bcrypt
5. **JWT Authentication**: Final authentication uses JWT tokens

## Testing Instructions

### Local Testing (Development Mode)

1. **Start MongoDB** (if not running):
   ```bash
   mongod
   ```

2. **Start Backend**:
   ```bash
   cd backend
   npm install
   node server.js
   ```
   - Server runs on `http://localhost:5000`
   - With `TWILIO_ENABLED=false`, OTPs are logged to console

3. **Start Frontend**:
   ```bash
   cd IT340finalproject-main
   npm install
   npm run dev
   ```
   - Frontend runs on `http://localhost:8080` (or configured port)

4. **Test Registration**:
   - Go to `/create-account`
   - Fill in all fields including phone number (e.g., +1234567890)
   - Submit form
   - Should redirect to login page

5. **Test Login & OTP**:
   - Go to `/login`
   - Enter email and password
   - Backend generates OTP and logs it to console
   - Should redirect to `/verify-otp`
   - Check backend console for OTP (look for highlighted log)
   - Enter the 5-digit OTP
   - Should receive JWT and redirect to welcome page

### Production Testing (Twilio Enabled)

1. **Set up Twilio**:
   - Create account at [twilio.com](https://www.twilio.com)
   - Get Account SID, Auth Token, and Phone Number
   - Update `.env` file:
     ```
     TWILIO_ENABLED=true
     TWILIO_ACCOUNT_SID=your_actual_sid
     TWILIO_AUTH_TOKEN=your_actual_token
     TWILIO_PHONE_NUMBER=your_twilio_number
     ```

2. **Test with Real Phone**:
   - Register with actual phone number
   - Login
   - Check phone for SMS with OTP
   - Enter OTP to complete authentication

## File Changes Summary

### Backend Files Modified/Created
- `backend/models/User.js` - Updated schema
- `backend/routes/auth.js` - Updated endpoints
- `backend/utils/smsService.js` - Created SMS service
- `backend/.env` - Added Twilio configuration
- `backend/package.json` - Added Twilio dependency

### Frontend Files Modified/Created
- `IT340finalproject-main/src/pages/CreateAccount.tsx` - Added phone field
- `IT340finalproject-main/src/pages/Login.tsx` - Updated login flow
- `IT340finalproject-main/src/pages/VerifyOTP.tsx` - Created OTP page
- `IT340finalproject-main/src/App.tsx` - Added route

## Dependencies Added
- **Backend**: `twilio` (v5.x)
- **Frontend**: None (uses existing `input-otp` library)

## Notes
- Phone numbers should include country code (e.g., +1 for US)
- OTP is exactly 5 digits (00000-99999)
- OTP expiration is 5 minutes (300 seconds)
- Multiple failed OTP attempts don't lock the account (user can login again)
- Each login generates a new OTP (previous OTPs are overwritten)
