#!/usr/bin/env node
/**
 * Simple API Test Script for MFA Implementation
 * Tests the backend endpoints without requiring a full frontend setup
 */

const baseURL = process.env.BACKEND_URL || 'http://localhost:5000';

// Test data
const testUser = {
  username: 'testuser_' + Date.now(),
  email: `testuser_${Date.now()}@example.com`,
  password: 'SecurePass123!',
  phoneNumber: '+15551234567'
};

let userId = null;

console.log('='.repeat(60));
console.log('MFA Implementation - API Test Script');
console.log('='.repeat(60));
console.log();

// Test 1: User Registration
async function testSignup() {
  console.log('Test 1: User Registration');
  console.log('-'.repeat(60));
  console.log('Testing POST /api/auth/signup');
  console.log('Request body:', JSON.stringify(testUser, null, 2));
  
  try {
    const response = await fetch(`${baseURL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });
    
    const data = await response.json();
    console.log('Response status:', response.status);
    console.log('Response body:', JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log('✅ Registration successful');
      return true;
    } else {
      console.log('❌ Registration failed:', data.message);
      return false;
    }
  } catch (error) {
    console.log('❌ Network error:', error.message);
    return false;
  } finally {
    console.log();
  }
}

// Test 2: User Login (OTP Generation)
async function testLogin() {
  console.log('Test 2: User Login (OTP Generation)');
  console.log('-'.repeat(60));
  console.log('Testing POST /api/auth/login');
  console.log('Request body:', JSON.stringify({
    email: testUser.email,
    password: testUser.password
  }, null, 2));
  
  try {
    const response = await fetch(`${baseURL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password
      })
    });
    
    const data = await response.json();
    console.log('Response status:', response.status);
    console.log('Response body:', JSON.stringify(data, null, 2));
    
    if (response.ok && data.requiresOTP && data.userId) {
      console.log('✅ Login successful - OTP required');
      console.log('⚠️  Check backend console for OTP (TWILIO_ENABLED=false mode)');
      userId = data.userId;
      return true;
    } else {
      console.log('❌ Login failed:', data.message);
      return false;
    }
  } catch (error) {
    console.log('❌ Network error:', error.message);
    return false;
  } finally {
    console.log();
  }
}

// Test 3: OTP Verification (with manual input)
async function testOTPVerification() {
  console.log('Test 3: OTP Verification');
  console.log('-'.repeat(60));
  console.log('Testing POST /api/auth/verify-otp');
  
  if (!userId) {
    console.log('❌ No userId available. Login test must succeed first.');
    console.log();
    return false;
  }
  
  console.log();
  console.log('📋 INSTRUCTIONS:');
  console.log('1. Check the backend console for the OTP');
  console.log('2. The OTP will be in a highlighted section:');
  console.log('   ==================================================');
  console.log('   [LOCAL TEST MODE] OTP for +15551234567: 12345');
  console.log('   ==================================================');
  console.log('3. Enter the 5-digit OTP when prompted');
  console.log();
  
  // In a real test, we would read from stdin
  // For automated testing, this would need to be mocked
  console.log('⚠️  Manual testing required for this step.');
  console.log('   Use the following curl command to test:');
  console.log();
  console.log(`   curl -X POST ${baseURL}/api/auth/verify-otp \\`);
  console.log(`     -H "Content-Type: application/json" \\`);
  console.log(`     -d '{"userId": "${userId}", "otp": "YOUR_OTP_HERE"}'`);
  console.log();
  console.log('Expected success response:');
  console.log('  {');
  console.log('    "token": "eyJhbGciOiJIUzI1NiIsInR...",');
  console.log('    "username": "testuser_...",');
  console.log('    "message": "Authentication successful"');
  console.log('  }');
  console.log();
  
  return true;
}

// Test 4: Test Invalid OTP
async function testInvalidOTP() {
  console.log('Test 4: Invalid OTP Test');
  console.log('-'.repeat(60));
  console.log('Testing POST /api/auth/verify-otp with invalid OTP');
  
  if (!userId) {
    console.log('❌ No userId available. Login test must succeed first.');
    console.log();
    return false;
  }
  
  const invalidOTP = '00000';
  console.log('Request body:', JSON.stringify({ userId, otp: invalidOTP }, null, 2));
  
  try {
    const response = await fetch(`${baseURL}/api/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, otp: invalidOTP })
    });
    
    const data = await response.json();
    console.log('Response status:', response.status);
    console.log('Response body:', JSON.stringify(data, null, 2));
    
    if (!response.ok && data.message === 'Invalid OTP') {
      console.log('✅ Invalid OTP correctly rejected');
      return true;
    } else {
      console.log('❌ Expected invalid OTP error');
      return false;
    }
  } catch (error) {
    console.log('❌ Network error:', error.message);
    return false;
  } finally {
    console.log();
  }
}

// Run all tests
async function runTests() {
  console.log('Starting API tests...');
  console.log();
  
  const results = {
    signup: false,
    login: false,
    invalidOTP: false
  };
  
  results.signup = await testSignup();
  
  if (results.signup) {
    results.login = await testLogin();
    
    if (results.login) {
      results.invalidOTP = await testInvalidOTP();
      await testOTPVerification();
    }
  }
  
  console.log('='.repeat(60));
  console.log('Test Summary');
  console.log('='.repeat(60));
  console.log('✅ Registration:', results.signup ? 'PASSED' : 'FAILED');
  console.log('✅ Login (OTP Generation):', results.login ? 'PASSED' : 'FAILED');
  console.log('✅ Invalid OTP Rejection:', results.invalidOTP ? 'PASSED' : 'FAILED');
  console.log('⚠️  OTP Verification: MANUAL TEST REQUIRED');
  console.log('='.repeat(60));
  console.log();
  
  if (results.signup && results.login && results.invalidOTP) {
    console.log('🎉 All automated tests passed!');
    console.log('👉 Complete the manual OTP verification test to finish validation.');
  } else {
    console.log('❌ Some tests failed. Check the output above for details.');
  }
}

// Check if backend is running
async function checkBackend() {
  try {
    const response = await fetch(`${baseURL}/api/auth/me`);
    if (response.status === 401 || response.status === 400) {
      return true; // Backend is running (401 = no token, which is expected)
    }
    return false;
  } catch (error) {
    return false;
  }
}

// Main execution
(async () => {
  console.log('Checking if backend is running at', baseURL, '...');
  const backendRunning = await checkBackend();
  
  if (!backendRunning) {
    console.log('❌ Backend is not running or not reachable.');
    console.log('Please start the backend server:');
    console.log('  cd backend && node server.js');
    console.log();
    process.exit(1);
  }
  
  console.log('✅ Backend is running');
  console.log();
  
  await runTests();
})();
