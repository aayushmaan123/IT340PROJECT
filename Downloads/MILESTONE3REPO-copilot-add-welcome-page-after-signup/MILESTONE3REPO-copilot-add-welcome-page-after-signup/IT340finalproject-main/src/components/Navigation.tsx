import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Search, Menu, Footprints } from 'lucide-react';
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import AddToCartButton from '@/components/AddToCartButton';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { username, signOut } = useUser();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState('');
  const inputRef = useRef(null);

  const handleSearchIconClick = () => {
    setShowSearch((prev) => !prev);
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 100);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setSearchLoading(true);
    setSearchError('');
    setSearchResults([]);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/search?q=${encodeURIComponent(searchTerm)}`);
      const data = await res.json();
      setSearchResults(data);
      if (!data.length) setSearchError('No products found');
    } catch (err) {
      setSearchError('Error searching products');
    }
    setSearchLoading(false);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 relative">
          {/* Logo */}
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <Footprints className="w-6 h-6" />
            </motion.div>
          </Link>

          {/* Username & Sign Out (Top Left) */}
          {username && (
            <div className="flex items-center gap-3 absolute left-4 top-4 md:static md:ml-0">
              <span className="font-medium text-foreground">{username}</span>
              <Button size="sm" variant="outline" onClick={signOut}>Sign Out</Button>
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="/newdrops">New Drops</NavLink>
            <NavLink href="/trending">Trending</NavLink>
            <NavLink href="/sale">Sale</NavLink>
            <NavLink href="/about">About</NavLink>
          </div>

          {/* Right Side Icons & Buttons */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="p-2 hover:bg-secondary rounded-md transition-colors duration-200"
              aria-label="Search"
              onClick={handleSearchIconClick}
            >
              <Search className="w-5 h-5" />
            </motion.button>
            <IconButton icon={ShoppingCart} label="Cart" onClick={() => navigate('/cart')} />
            {!username && (
              <div className="hidden md:flex items-center gap-2 ml-2">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="font-light transition-all duration-200 hover:bg-secondary"
                  >
                    Log in
                  </Button>
                </Link>
                <Link to="/create-account">
                  <Button
                    size="sm"
                    className="font-light transition-all duration-200 bg-foreground text-background hover:bg-foreground/90"
                  >
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-md transition-colors duration-200"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
        {/* Search Bar Dropdown */}
        {showSearch && (
          <div className="absolute left-0 right-0 top-16 z-50 bg-background border-b border-border shadow-lg">
            <form onSubmit={handleSearch} className="flex items-center gap-2 px-4 py-3">
              <input
                ref={inputRef}
                type="text"
                className="flex-1 border border-border rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <Button type="submit" size="sm">Search</Button>
            </form>
            <div className="px-4 pb-4">
              {searchLoading && <div>Searching...</div>}
              {searchError && <div className="text-destructive text-sm mt-2">{searchError}</div>}
              {!searchLoading && !searchError && searchResults.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
                  {searchResults.map(product => (
                    <div key={product._id} className="bg-card border border-border rounded-lg p-4 flex flex-col items-center">
                      <img
                        src={product.image || '/placeholder.svg'}
                        alt={product.name}
                        className="w-32 h-32 object-cover mb-2 rounded-md"
                        onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/placeholder.svg'; }}
                      />
                      <div className="font-semibold text-base mb-1">{product.name}</div>
                      <div className="text-primary text-lg font-bold mb-2">${product.price}</div>
                      <AddToCartButton productId={product._id} onAdded={() => {}} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border py-4"
          >
            <div className="flex flex-col gap-4">
              <NavLink href="/newdrops" mobile>New Drops</NavLink>
              <NavLink href="/trending" mobile>Trending</NavLink>
              <NavLink href="/sale" mobile>Sale</NavLink>
              <NavLink href="/about" mobile>About</NavLink>
              <div className="flex gap-2 pt-4 border-t border-border">
                <Link to="/login" className="flex-1">
                  <Button
                    variant="ghost"
                    className="w-full font-light"
                  >
                    Log in
                  </Button>
                </Link>
                <Link to="/create-account" className="flex-1">
                  <Button
                    className="w-full font-light bg-foreground text-background hover:bg-foreground/90"
                  >
                    Sign up
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

function NavLink({ href, children, mobile }: { href: string; children: React.ReactNode; mobile?: boolean }) {
  return (
    <a
      href={href}
      className={`font-light text-muted-foreground hover:text-foreground transition-colors duration-200 ${
        mobile ? 'text-base py-2' : 'text-sm'
      }`}
    >
      {children}
    </a>
  );
}

function IconButton({ icon: Icon, label, onClick }: { icon: any; label: string; onClick?: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className="p-2 hover:bg-secondary rounded-md transition-colors duration-200"
      aria-label={label}
      onClick={onClick}
    >
      <Icon className="w-5 h-5" />
    </motion.button>
  );
}
