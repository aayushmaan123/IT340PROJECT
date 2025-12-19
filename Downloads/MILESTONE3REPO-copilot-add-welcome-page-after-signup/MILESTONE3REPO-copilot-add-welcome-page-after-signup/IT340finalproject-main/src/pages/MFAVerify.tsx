import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const MFAVerify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state || {};
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleVerify = async (e: any) => {
    e.preventDefault();
    setError('');
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, mfaToken: code })
    });
    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem('token', data.token);
      navigate('/home');
    } else {
      setError(data.message || 'Invalid code');
    }
  };

  if (!email || !password) return <div>Missing login info.</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Enter MFA Code</h2>
      <form onSubmit={handleVerify} className="flex flex-col gap-2 items-center">
        <input
          type="text"
          placeholder="6-digit code"
          value={code}
          onChange={e => setCode(e.target.value)}
          className="border px-2 py-1 rounded text-black"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Verify</button>
      </form>
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </div>
  );
};

export default MFAVerify;
