import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LoginInput } from '@/components/ui/login-form';
import sneakerBg from '@/assets/sneaker-1.jpg';
import { useUser } from '@/context/UserContext';

const Login = () => {
  const navigate = useNavigate();
  const { setUsername } = useUser();
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [apiMessage, setApiMessage] = useState('');

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiMessage('');
    // Send login request to backend
    const res = await fetch('http://192.168.50.128:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem('token', data.token);
      setUsername(data.username || '');
      navigate('/welcome', { state: { username: data.username } });
    } else {
      setApiMessage(data.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4">
      <div className='bg-card border border-border rounded-lg w-full max-w-5xl flex justify-between overflow-hidden min-h-[600px]'>
        <div
          className='w-full lg:w-1/2 px-4 lg:px-16 relative overflow-hidden'
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div
            className={`absolute pointer-events-none w-[500px] h-[500px] bg-gradient-to-r from-purple-300/10 via-blue-300/10 to-pink-300/10 rounded-full blur-3xl transition-opacity duration-200 ${
              isHovering ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transform: `translate(${mousePosition.x - 250}px, ${mousePosition.y - 250}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          />
          <div className="relative z-10 h-full flex flex-col justify-center">
            <form
              className="text-center py-10 md:py-20 grid gap-2"
              onSubmit={handleSubmit}
            >
              <div className='grid gap-4 md:gap-6 mb-2'>
                <h1 className='text-3xl md:text-4xl font-extrabold'>Sign in</h1>
                <span className='text-sm text-muted-foreground'>Access your sneaker collection</span>
              </div>
              <div className='grid gap-4 items-center mt-6'>
                <LoginInput placeholder="Email" type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                <LoginInput placeholder="Password" type="password" required value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
              </div>
              <a href="#" className='font-light text-sm md:text-md text-muted-foreground hover:text-foreground transition-colors mt-2'>
                Forgot your password?
              </a>
              {apiMessage && <div className="mt-2 text-center text-sm text-red-600">{apiMessage}</div>}
              <div className='flex gap-4 justify-center items-center mt-4'>
                <button 
                  type="submit"
                  className="group/button relative inline-flex justify-center items-center overflow-hidden rounded-md bg-primary text-primary-foreground px-6 py-2.5 text-sm font-medium transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-primary/50 cursor-pointer"
                >
                  <span className="relative z-10">Sign In</span>
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                    <div className="relative h-full w-8 bg-white/20" />
                  </div>
                </button>
              </div>
              <div className='mt-6'>
                <Link to="/" className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
                  ← Back to home
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

export default Login;
