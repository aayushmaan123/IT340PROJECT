import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import AddToCartButton from '@/components/AddToCartButton';

const Home = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    // Fetch user profile to get username
    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('username, email_verified')
          .eq('user_id', user.id)
          .maybeSingle();

        if (data && !error) {
          setUsername(data.username);
          setEmailVerified(data.email_verified);
        }
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  useEffect(() => {
    // Fetch products for the user
    const fetchProducts = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('user_id', user.id);

        if (data && !error) {
          setProducts(data);
        }
      }
    };

    fetchProducts();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="text-2xl font-bold text-foreground">
              SNEAKERS
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground text-sm">
                {user.email}
              </span>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Welcome Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4">
            Welcome, {username}!
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            You're now logged in to your sneaker account.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/"
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
            >
              Browse Sneakers
            </Link>
          </div>
        </div>

        {/* User Info Card */}
        <div className="mt-16 max-w-md mx-auto">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Your Profile</h2>
            <div className="space-y-3">
              <div>
                <span className="text-muted-foreground text-sm">Username:</span>
                <p className="text-foreground font-medium">{username}</p>
              </div>
              <div>
                <span className="text-muted-foreground text-sm">Email:</span>
                <p className="text-foreground font-medium">{user.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Your Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => (
              <div key={product._id} className="bg-card border border-border rounded-lg p-4">
                <img
                  src={product.image || '/placeholder.svg'}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <div className="text-center">
                  <div className="text-lg font-semibold text-foreground mb-2">
                    {product.name}
                  </div>
                  <div className="text-primary font-bold text-xl mb-4">
                    ${product.price}
                  </div>
                  <AddToCartButton productId={product._id} onAdded={() => { /* Optionally show a message or update state */ }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
