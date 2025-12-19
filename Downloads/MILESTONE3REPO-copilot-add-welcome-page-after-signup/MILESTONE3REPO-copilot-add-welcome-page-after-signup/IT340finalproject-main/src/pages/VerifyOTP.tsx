import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import sneakerBg from '@/assets/sneaker-2.jpg';
import { toast } from 'sonner';
import { useUser } from '@/context/UserContext';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUsername } = useUser();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  const userId = location.state?.userId;

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setError('OTP has expired. Please login again.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [userId, navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 5) {
      setError('Please enter a complete 5-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, otp })
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        setUsername(data.username || '');
        toast.success('Authentication successful!');
        navigate('/welcome', { state: { username: data.username } });
      } else {
        setError(data.message || 'Invalid OTP');
        setOtp(''); // Clear OTP input on error
      }
    } catch (err) {
      console.error('OTP verification error:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    // Redirect back to login to generate a new OTP
    toast.info('Please login again to receive a new OTP');
    navigate('/login');
  };

  if (!userId) {
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4">
      <div className='bg-card border border-border rounded-lg w-full max-w-5xl flex justify-between overflow-hidden min-h-[600px]'>
        <div className='w-full lg:w-1/2 px-4 lg:px-16 relative overflow-hidden'>
          <div className="relative z-10 h-full flex flex-col justify-center">
            <form
              className="text-center py-10 md:py-20 grid gap-6"
              onSubmit={handleVerify}
            >
              <div className='grid gap-4 md:gap-6 mb-2'>
                <h1 className='text-3xl md:text-4xl font-extrabold'>Verify OTP</h1>
                <span className='text-sm text-muted-foreground'>
                  Enter the 5-digit code sent to your phone
                </span>
              </div>

              <div className='flex justify-center mt-6'>
                <InputOTP
                  maxLength={5}
                  value={otp}
                  onChange={(value) => {
                    setOtp(value);
                    setError('');
                  }}
                  disabled={loading || timeLeft === 0}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className='text-sm text-muted-foreground'>
                Time remaining: <span className='font-semibold text-foreground'>{formatTime(timeLeft)}</span>
              </div>

              {error && (
                <div className="text-destructive text-sm">
                  {error}
                </div>
              )}

              <div className='flex gap-4 justify-center items-center mt-4'>
                <button 
                  type="submit"
                  className="group/button relative inline-flex justify-center items-center overflow-hidden rounded-md bg-primary text-primary-foreground px-6 py-2.5 text-sm font-medium transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-primary/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading || otp.length !== 5 || timeLeft === 0}
                >
                  <span className="relative z-10">
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </span>
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                    <div className="relative h-full w-8 bg-white/20" />
                  </div>
                </button>
              </div>

              <div className='mt-4'>
                <button
                  type="button"
                  onClick={handleResend}
                  className='text-sm text-muted-foreground hover:text-foreground transition-colors underline'
                >
                  Didn't receive the code? Login again
                </button>
              </div>

              <div className='mt-2'>
                <Link to="/login" className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
                  ← Back to login
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className='hidden lg:block w-1/2 overflow-hidden relative'>
          <img
            src={sneakerBg}
            alt="Sneaker background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
