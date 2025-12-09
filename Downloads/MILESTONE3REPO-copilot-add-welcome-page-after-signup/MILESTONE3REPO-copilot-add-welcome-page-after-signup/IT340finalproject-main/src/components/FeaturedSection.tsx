import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

import sneaker1 from '@/assets/sneaker-1.jpg';
import sneaker2 from '@/assets/sneaker-2.jpg';
import sneaker3 from '@/assets/sneaker-3.jpg';
import sneaker4 from '@/assets/sneaker-4.jpg';
import sneaker5 from '@/assets/sneaker-5.jpg';
import sneaker6 from '@/assets/sneaker-6.jpg';

const sneakers = [
  {
    id: 1,
    name: 'Sky Force Elite',
    price: '$189',
    image: sneaker1,
    tag: 'New',
  },
  {
    id: 2,
    name: 'Velocity Pro',
    price: '$159',
    image: sneaker2,
    tag: 'Popular',
  },
  {
    id: 3,
    name: 'Cloud Walker',
    price: '$229',
    image: sneaker3,
    tag: 'Limited',
  },
  {
    id: 4,
    name: 'Retro Legend',
    price: '$199',
    image: sneaker4,
    tag: 'Sale',
  },
  {
    id: 5,
    name: 'Tech Runner',
    price: '$249',
    image: sneaker5,
    tag: 'New',
  },
  {
    id: 6,
    name: 'Classic Luxe',
    price: '$179',
    image: sneaker6,
    tag: 'Popular',
  },
];

export function FeaturedSection() {
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-light tracking-tighter mb-4">Featured Drops</h2>
          <p className="text-xl font-light text-muted-foreground max-w-2xl mx-auto">
            Handpicked exclusive designs that define the culture
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sneakers.map((sneaker, index) => (
            <motion.div
              key={sneaker.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="group bg-card border-border hover:border-foreground/20 transition-all duration-200 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    {sneaker.tag && (
                      <div className="absolute top-4 left-4 z-10 bg-foreground text-background px-3 py-1 rounded text-xs font-normal">
                        {sneaker.tag}
                      </div>
                    )}
                    <div className="aspect-[4/3] overflow-hidden bg-gradient-card">
                      <img
                        src={sneaker.image}
                        alt={sneaker.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-normal mb-2 tracking-tight">
                      {sneaker.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-light">
                        {sneaker.price}
                      </span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="hover:bg-secondary transition-all duration-200"
                      >
                        <ShoppingCart className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
