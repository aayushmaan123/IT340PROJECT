# Local Testing Guide for SMS-Based MFA

## Prerequisites

Before testing, ensure you have:
- Node.js installed (v14 or higher)
- MongoDB installed and running
- Git clone of the repository

## Step-by-Step Testing Instructions

### 1. Setup Backend

```bash
# Navigate to backend directory
cd Downloads/MILESTONE3REPO-copilot-add-welcome-page-after-signup/MILESTONE3REPO-copilot-add-welcome-page-after-signup/backend

# Install dependencies (if not already done)
npm install

# Verify .env configuration
cat .env
```

**Important .env Settings for Local Testing:**
```env
MONGO_URI="mongodb://localhost:27017/it340db"
JWT_SECRET=mysupersecretkey
PORT=5000
HOST=0.0.0.0

# LOCAL TESTING MODE - OTP will be logged to console
TWILIO_ENABLED=false
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=your_twilio_phone_number_here
```

**Key Point:** With `TWILIO_ENABLED=false`, you don't need real Twilio credentials. The OTP will be printed to the console.

```bash
# Start the backend server
node server.js
```

You should see:
```
Server running on http://0.0.0.0:5000
MongoDB connected
```

### 2. Setup Frontend

Open a **new terminal window/tab**:

```bash
# Navigate to frontend directory
cd Downloads/MILESTONE3REPO-copilot-add-welcome-page-after-signup/MILESTONE3REPO-copilot-add-welcome-page-after-signup/IT340finalproject-main

# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
```

You should see:
```
VITE v5.4.19  ready in XXX ms
➜  Local:   http://localhost:8080/
```

### 3. Start MongoDB

If MongoDB isn't running, start it:

```bash
# On Ubuntu/Linux
sudo systemctl start mongod

# OR use mongod directly
mongod --dbpath /path/to/your/data/directory

# Verify MongoDB is running
mongosh
# Then type: show dbs
```

### 4. Testing the Complete Flow

#### A. Create a New Account

1. Open your browser and go to `http://localhost:8080/create-account`

2. Fill in the form:
   - **Full Name**: Test User
   - **Email**: test@example.com
   - **Phone Number**: +15551234567 (use any valid format, e.g., +1234567890)
   - **Password**: password123
   - **Confirm Password**: password123

3. Click "Create Account"

4. You should see a success message and be redirected to the login page

**Screenshot of Create Account Page:**
![Create Account](https://github.com/user-attachments/assets/af77f05c-49e6-447a-89f2-92b2efcbffad)

#### B. Login and Get OTP

1. On the login page (`http://localhost:8080/login`), enter:
   - **Email**: test@example.com
   - **Password**: password123

2. Click "Sign In"

3. **IMPORTANT:** Check the **backend console** (the terminal where `node server.js` is running)

4. You should see output like this:
   ```
   ==================================================
   [LOCAL TEST MODE] OTP for +15551234567: 12345
   ==================================================
   ```

5. The frontend will automatically redirect you to the OTP verification page

#### C. Verify OTP

1. You should now be on `http://localhost:8080/verify-otp`

2. Enter the 5-digit OTP you saw in the backend console (e.g., 12345)

3. The timer will show the remaining time (5:00 minutes)

4. Click "Verify OTP"

5. If the OTP is correct, you'll be authenticated and redirected to the welcome page

**Screenshot of OTP Verification Page:**
![OTP Verification](https://github.com/user-attachments/assets/45070484-098f-4a48-bed3-84927e02f082)

### 5. Testing Edge Cases

#### Test Invalid OTP
1. Login again with the same credentials
2. Check backend console for the new OTP
3. Enter a different 5-digit code (e.g., 00000)
4. You should see an error: "Invalid OTP"

#### Test Expired OTP
1. Login and get an OTP
2. Wait for 5 minutes (or adjust `mfaExpiresAt` in the code for faster testing)
3. Try to verify after expiration
4. You should see: "OTP has expired. Please login again."

#### Test Phone Number Validation
1. Try to create an account with invalid phone numbers:
   - "1234" (too short)
   - "abcd1234" (contains letters)
2. You should see validation errors

### 6. Troubleshooting

#### Backend not starting?
- **Check MongoDB**: Ensure MongoDB is running (`mongosh` to test connection)
- **Port conflict**: Make sure port 5000 isn't used by another process
  ```bash
  lsof -i :5000
  # If something is using it, kill it or change PORT in .env
  ```

#### Frontend not starting?
- **Port conflict**: Make sure port 8080 isn't used
  ```bash
  lsof -i :8080
  ```
- **Dependencies**: Try deleting `node_modules` and `package-lock.json`, then `npm install`

#### "Server error" on signup?
- This usually means MongoDB isn't connected
- Check the backend console for MongoDB connection errors
- Verify `MONGO_URI` in `.env` is correct

#### OTP not appearing in console?
- Make sure `TWILIO_ENABLED=false` in backend `.env`
- Check the backend console output (not the frontend console)
- Look for the highlighted section with `=` characters

#### OTP verification failing?
- Make sure you're using the exact OTP from the console
- Check that less than 5 minutes have passed
- Each login generates a new OTP - use the most recent one

### 7. Using the API Test Script

You can also test the API directly:

```bash
# From the repository root
node test-mfa-api.js
```

This will:
1. Test user registration
2. Test login (OTP generation)
3. Test invalid OTP rejection
4. Provide instructions for manual OTP verification

### 8. Viewing Database Records

To see the user data in MongoDB:

```bash
mongosh
use it340db
db.users.find().pretty()
```

You should see user documents with:
- `phoneNumber`
- `mfaCodeHash` (hashed OTP, changes each login)
- `mfaExpiresAt` (expiration timestamp)
- `mfaEnabled: true`

## Quick Reference

| Action | URL |
|--------|-----|
| Create Account | http://localhost:8080/create-account |
| Login | http://localhost:8080/login |
| OTP Verification | http://localhost:8080/verify-otp |
| Backend API | http://localhost:5000/api/auth/* |

## Common Test Phone Numbers

For local testing, you can use any format:
- +15551234567
- +1234567890
- +447911123456 (UK format)

Remember: With `TWILIO_ENABLED=false`, the actual phone number doesn't matter - OTP will always log to console.

## Next Steps: Production Testing

To test with **real SMS** via Twilio:

1. Sign up for Twilio account: https://www.twilio.com/try-twilio
2. Get your Account SID, Auth Token, and a Twilio phone number
3. Update backend `.env`:
   ```env
   TWILIO_ENABLED=true
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=your_real_token
   TWILIO_PHONE_NUMBER=+1234567890
   ```
4. Use your real phone number when creating an account
5. Check your phone for SMS with OTP

**Note:** Twilio trial accounts can send SMS to verified phone numbers only.

## Video Demo Flow

If you want to record a demo, follow this flow:

1. Open http://localhost:8080/create-account
2. Fill in the form with phone number
3. Submit and get redirected to login
4. Login with credentials
5. Show backend console with OTP highlighted
6. Enter OTP on verification page
7. Show successful authentication

## Support

For issues or questions:
- Check `MFA_IMPLEMENTATION.md` for detailed technical documentation
- Check `SECURITY_SUMMARY.md` for security details
- Review backend console logs for error messages
- Check MongoDB connection if getting "Server error"
