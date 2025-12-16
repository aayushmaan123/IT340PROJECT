import React, { useEffect, useState } from 'react';

function Home() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Not logged in.');
      window.location.href = '/login';
      return;
    }
    fetch('http://192.168.50.128:5000/api/auth/me', {
      headers: { 'Authorization': 'Bearer ' + token },
    })
      .then(res => res.json())
      .then(data => {
        if (data.username) {
          setUser(data);
        } else {
          setMessage(data.message || 'Invalid or expired token.');
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      })
      .catch(() => {
        setMessage('Error fetching user info.');
        localStorage.removeItem('token');
        window.location.href = '/login';
      });
  }, []);

  if (user) {
    return <h2>Welcome, {user.username}!</h2>;
  }
  return <div>{message || 'Loading...'}</div>;
}

export default Home;
