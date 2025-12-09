import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flame, TrendingUp, Tag } from 'lucide-react';

import sneaker1 from '@/assets/sneaker-1.jpg';
import sneaker2 from '@/assets/sneaker-2.jpg';
import sneaker3 from '@/assets/sneaker-3.jpg';
import sneaker4 from '@/assets/sneaker-4.jpg';

const categories = {
  newdrops: [
    { id: 1, name: 'Sky Force Elite', price: '$189', image: sneaker1 },
    { id: 2, name: 'Velocity Pro', price: '$159', image: sneaker2 },
  ],
  trending: [
    { id: 3, name: 'Cloud Walker', price: '$229', image: sneaker3 },
    { id: 4, name: 'Retro Legend', price: '$199', image: sneaker4 },
  ],
  sale: [
    { id: 5, name: 'Tech Runner', price: '$149', image: sneaker1, originalPrice: '$249' },
    { id: 6, name: 'Classic Luxe', price: '$129', image: sneaker2, originalPrice: '$179' },
  ],
};

export function CategorySection() {
  const [activeTab, setActiveTab] = useState('newdrops');

  const getIcon = (tab: string) => {
    switch (tab) {
      case 'newdrops':
        return <Flame className="h-4 w-4" />;
      case 'trending':
        return <TrendingUp className="h-4 w-4" />;
      case 'sale':
        return <Tag className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <section className="py-24 px-4 bg-gradient-subtle">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-light tracking-tighter mb-4">Explore By Category</h2>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12 bg-card">
            <TabsTrigger value="newdrops" className="flex items-center gap-2">
              {getIcon('newdrops')}
              <span className="hidden sm:inline">New Drops</span>
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center gap-2">
              {getIcon('trending')}
              <span className="hidden sm:inline">Trending</span>
            </TabsTrigger>
            <TabsTrigger value="sale" className="flex items-center gap-2">
              {getIcon('sale')}
              <span className="hidden sm:inline">Sale</span>
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            >
              {categories[activeTab as keyof typeof categories].map((item) => (
                <Card key={item.id} className="bg-card border-border hover:border-foreground/20 transition-all duration-200">
                  <CardContent className="p-0">
                    <div className="aspect-video overflow-hidden bg-gradient-card">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-normal mb-2 tracking-tight">{item.name}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-light">{item.price}</span>
                          {item.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              {item.originalPrice}
                            </span>
                          )}
                        </div>
                        <Button variant="ghost" size="sm" className="text-xs">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </div>
    </section>
  );
}
