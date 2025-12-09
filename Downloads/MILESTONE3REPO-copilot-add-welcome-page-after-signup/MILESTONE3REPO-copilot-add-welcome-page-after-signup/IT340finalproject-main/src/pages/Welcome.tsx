import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { useUser } from '@/context/UserContext';

interface LocationState {
  username?: string;
}

const Welcome = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const { username } = useUser();
  const displayName = state?.username || username || 'User';

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-3xl md:text-4xl font-extrabold mb-4"
          >
            Welcome to SoleVerse, {displayName}!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-muted-foreground mb-8"
          >
            Your account has been created successfully. You're now part of our sneaker community!
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link to="/">
              <Button
                size="lg"
                className="font-medium bg-foreground text-background hover:bg-foreground/90"
                aria-label="Continue shopping and return to homepage"
              >
                Continue shopping
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Welcome;
