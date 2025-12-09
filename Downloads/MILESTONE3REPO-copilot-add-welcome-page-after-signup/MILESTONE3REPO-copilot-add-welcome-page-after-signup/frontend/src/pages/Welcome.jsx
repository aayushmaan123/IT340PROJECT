import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function Welcome() {
  // Get username from location state
  const location = useLocation();
  const username = location.state?.username || 'User';

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>🎉 Account Successfully Created! 🎉</h1>
      <h2>Welcome, {username}!</h2>
      <p>Your account has been created and you are now logged in.</p>
      <Link to="/home">
        <button style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
          Go to Home
        </button>
      </Link>
      <p style={{ marginTop: '40px', color: 'gray', fontSize: '14px' }}>
        (If you want to check your account in MongoDB Compass, connect to <b>mongodb://localhost:27017</b> and look for <b>it340db.users</b>.)
      </p>
    </div>
  );
}

export default Welcome;
