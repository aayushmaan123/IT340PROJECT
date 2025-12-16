import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const WelcomePage = () => {
  const { user, signOut } = useContext(AuthContext);

  return (
    <div>
      {user && (
        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>Welcome, {user.username}</span>
          <button onClick={signOut}>Sign Out</button>
        </div>
      )}
      {/* ...existing welcome page content... */}
    </div>
  );
};

export default WelcomePage;