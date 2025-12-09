import { motion } from 'framer-motion';
import { DotPattern } from '@/components/ui/dot-pattern';
import sneakerCulture from '@/assets/sneaker-culture.jpg';

export function AboutSection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <DotPattern />
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-light tracking-tighter mb-6">
              The Culture. <br />
              The Passion.
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              At SoleVerse, we believe sneakers are more than just footwear—they're a statement, 
              a lifestyle, a piece of art. Born from the streets and elevated by innovation, 
              our collection brings together the finest craftsmanship and cutting-edge design.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              From limited-edition drops to timeless classics, every pair tells a story. 
              Join a community that celebrates individuality, style, and the relentless pursuit of excellence.
            </p>
            <div className="flex flex-wrap gap-8">
              <div>
                <div className="text-4xl font-light mb-2">10K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div>
                <div className="text-4xl font-light mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Unique Styles</div>
              </div>
              <div>
                <div className="text-4xl font-light mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Premium Brands</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-lg overflow-hidden border border-border shadow-elegant">
              <img
                src={sneakerCulture}
                alt="SoleVerse Culture"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
