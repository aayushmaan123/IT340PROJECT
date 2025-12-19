import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [message, setMessage] = useState('Verifying email...');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (token) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-email?token=${token}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setSuccess(true);
            setMessage('Email verified! Redirecting to MFA setup...');
            setTimeout(() => {
              navigate('/mfa-setup', { state: { email: localStorage.getItem('email') } });
            }, 2000);
          } else {
            setError(data.message || 'Verification failed');
          }
        })
        .catch(err => {
          setError('Network error');
        });
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
      {success && <div className="text-green-600 text-lg">{message}</div>}
      {error && <div className="text-red-600 text-lg">{error}</div>}
      {!success && !error && <div className="text-blue-600 text-lg">{message}</div>}
    </div>
  );
};

export default VerifyEmail;