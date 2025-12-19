import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const MFASetup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const [qr, setQr] = useState('');
  const [secret, setSecret] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (email) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/mfa/setup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
        .then(res => res.json())
        .then(data => {
          setQr(data.qr);
          setSecret(data.secret);
        });
    }
  }, [email]);

  const handleVerify = async (e: any) => {
    e.preventDefault();
    setError('');
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/mfa/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, token: code })
    });
    if (res.ok) {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1200);
    } else {
      setError('Invalid code');
    }
  };

  if (!email) return <div>No email provided.</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Enable Two-Factor Authentication</h2>
      {qr && <img src={qr} alt="Scan QR" className="mb-4" style={{ width: 200, height: 200 }} />}
      <form onSubmit={handleVerify} className="flex flex-col gap-2 items-center">
        <input
          type="text"
          placeholder="Enter 6-digit code"
          value={code}
          onChange={e => setCode(e.target.value)}
          className="border px-2 py-1 rounded text-black"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Verify & Enable</button>
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </form>
      {success && <div className="text-green-600 mt-2">MFA Enabled! Redirecting...</div>}
    </div>
  );
};

export default MFASetup;