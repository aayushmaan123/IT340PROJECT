import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate('/create-account');
    }
  }, [email, navigate]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Get userId from Supabase (or backend) if needed
      const userId = localStorage.getItem('user_id');
      const res = await fetch('http://localhost:54321/functions/v1/verify-2fa-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, code })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError(data.error || 'Invalid or expired code');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  if (!email) {
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-card border border-border rounded-lg w-full max-w-md p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Mail className="w-8 h-8 text-primary" />
        </motion.div>
        
        <h1 className="text-2xl font-bold mb-2">Check Your Email</h1>
        <p className="text-muted-foreground mb-6">
          We've sent a confirmation link to<br />
          <span className="text-foreground font-medium">{email}</span>
        </p>
        
        <div className="bg-muted/50 rounded-lg p-4 mb-6 text-sm text-muted-foreground">
          <p>Click the link in your email to verify your account. Once verified, you can log in.</p>
        </div>

        <div className="space-y-3">
          <Link 
            to="/login"
            className="block w-full bg-primary text-primary-foreground py-2.5 rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            Go to Login
          </Link>
          
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </motion.div>

      <form onSubmit={handleVerify} className="bg-card border border-border rounded-lg p-8 max-w-md w-full flex flex-col items-center gap-6 mt-8">
        <h1 className="text-2xl font-bold mb-2">Verify Your Email</h1>
        <p className="text-muted-foreground text-center mb-4">Enter the 6-digit code sent to <span className="font-semibold">{email}</span></p>
        <InputOTP maxLength={6} value={code} onChange={setCode} autoFocus>
          <InputOTPGroup>
            {[0,1,2,3,4,5].map(i => <InputOTPSlot key={i} index={i} />)}
          </InputOTPGroup>
        </InputOTP>
        {error && <div className="text-destructive text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">Verified! Redirecting...</div>}
        <Button type="submit" disabled={loading || code.length !== 6} className="w-full">{loading ? 'Verifying...' : 'Verify'}</Button>
      </form>
    </div>
  );
};

export default VerifyEmail;
