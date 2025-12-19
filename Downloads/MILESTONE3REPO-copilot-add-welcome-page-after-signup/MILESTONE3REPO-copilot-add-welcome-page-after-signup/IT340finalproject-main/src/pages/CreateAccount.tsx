import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LoginInput } from '@/components/ui/login-form';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import sneakerBg from '@/assets/sneaker-4.jpg';

const CreateAccount = () => {
  const navigate = useNavigate();
  const { signUp, user, loading } = useAuth();
  const { toast } = useToast();
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate('/home');
    }
  }, [user, loading, navigate]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const validateForm = () => {
    const newErrors = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
      isValid = false;
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
      isValid = false;
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
      isValid = false;
    } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one special character';
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    const { error } = await signUp(formData.email, formData.password, formData.fullName);

    if (error) {
      toast({
        title: "Signup Failed",
        description: error.message || "Could not create account",
        variant: "destructive"
      });
      setIsSubmitting(false);
    } else {
      toast({
        title: "Check Your Email",
        description: "We've sent you a confirmation link. Please check your email to verify your account."
      });
      navigate('/verify-email', { state: { email: formData.email } });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading...</div>
      </div>
    );
  }

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
                <h1 className='text-3xl md:text-4xl font-extrabold'>Create Account</h1>
                <span className='text-sm text-muted-foreground'>Join our sneaker community</span>
              </div>
              <div className='grid gap-4 items-center mt-6'>
                <div>
                  <LoginInput 
                    placeholder="Full Name" 
                    type="text" 
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    required 
                  />
                  {errors.fullName && (
                    <p className="text-destructive text-xs mt-1 text-left">{errors.fullName}</p>
                  )}
                </div>
                <div>
                  <LoginInput 
                    placeholder="Email" 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required 
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs mt-1 text-left">{errors.email}</p>
                  )}
                </div>
                <div>
                  <LoginInput 
                    placeholder="Password" 
                    type="password" 
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    required 
                  />
                  {errors.password && (
                    <p className="text-destructive text-xs mt-1 text-left">{errors.password}</p>
                  )}
                </div>
                <div>
                  <LoginInput 
                    placeholder="Confirm Password" 
                    type="password" 
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    required 
                  />
                  {errors.confirmPassword && (
                    <p className="text-destructive text-xs mt-1 text-left">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
              <div className='flex gap-4 justify-center items-center mt-4'>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="group/button relative inline-flex justify-center items-center overflow-hidden rounded-md bg-primary text-primary-foreground px-6 py-2.5 text-sm font-medium transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-primary/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">{isSubmitting ? 'Creating...' : 'Create Account'}</span>
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                    <div className="relative h-full w-8 bg-white/20" />
                  </div>
                </button>
              </div>
              <div className='mt-6'>
                <Link to="/login" className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
                  Already have an account? <span className="underline">Log in</span>
                </Link>
              </div>
              <div className='mt-2'>
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

export default CreateAccount;
