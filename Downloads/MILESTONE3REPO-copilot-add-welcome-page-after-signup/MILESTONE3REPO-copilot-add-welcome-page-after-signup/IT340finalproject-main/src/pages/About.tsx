import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import aboutImg from '@/assets/sneaker-culture.jpg';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-card border border-border rounded-lg shadow-elegant max-w-2xl w-full mx-auto p-8 flex flex-col md:flex-row gap-8 items-center"
        >
          <img
            src={aboutImg}
            alt="About SoleVerse"
            className="w-48 h-48 object-cover rounded-lg border border-border shadow-md mb-6 md:mb-0"
          />
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">About SoleVerse</h1>
            <p className="text-muted-foreground mb-4">
              SoleVerse is more than a sneaker store—it's a community for sneaker lovers. We bring you the latest drops, exclusive releases, and timeless classics, all in one place. Our mission is to connect people through a shared passion for style, culture, and innovation.
            </p>
            <p className="text-muted-foreground">
              Join us and step into a world where every pair tells a story.
            </p>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
