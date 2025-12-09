import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Search, Menu, Footprints } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@/context/UserContext';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { username, signOut } = useUser();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
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
            <NavLink href="#new">New Drops</NavLink>
            <NavLink href="#trending">Trending</NavLink>
            <NavLink href="#sale">Sale</NavLink>
            <NavLink href="#about">About</NavLink>
          </div>

          {/* Right Side Icons & Buttons */}
          <div className="flex items-center gap-3">
            <IconButton icon={Search} label="Search" />
            <IconButton icon={ShoppingCart} label="Cart" />
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
              <NavLink href="#new" mobile>New Drops</NavLink>
              <NavLink href="#trending" mobile>Trending</NavLink>
              <NavLink href="#sale" mobile>Sale</NavLink>
              <NavLink href="#about" mobile>About</NavLink>
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

function IconButton({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className="p-2 hover:bg-secondary rounded-md transition-colors duration-200"
      aria-label={label}
    >
      <Icon className="w-5 h-5" />
    </motion.button>
  );
}
