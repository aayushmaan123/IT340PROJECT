import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Filter, ChevronDown, X } from 'lucide-react';
import AddToCartButton from '@/components/AddToCartButton';

import sneaker1 from '@/assets/sneaker-1.jpg';
import sneaker2 from '@/assets/sneaker-2.jpg';
import sneaker3 from '@/assets/sneaker-3.jpg';
import sneaker4 from '@/assets/sneaker-4.jpg';
import sneaker5 from '@/assets/sneaker-5.jpg';
import sneaker6 from '@/assets/sneaker-6.jpg';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  tag?: string;
  category: string;
}

const allProducts: Product[] = [
  {
    id: 1,
    name: 'Sky Force Elite',
    description: 'Premium comfort meets street style',
    price: 189,
    image: sneaker1,
    tag: 'New',
    category: 'Running',
  },
  {
    id: 2,
    name: 'Velocity Pro',
    description: 'Engineered for peak performance',
    price: 159,
    image: sneaker2,
    tag: 'Popular',
    category: 'Athletic',
  },
  {
    id: 3,
    name: 'Cloud Walker',
    description: 'Walk on clouds, look like fire',
    price: 229,
    image: sneaker3,
    tag: 'Limited',
    category: 'Lifestyle',
  },
  {
    id: 4,
    name: 'Retro Legend',
    description: 'Classic design, modern comfort',
    price: 149,
    originalPrice: 199,
    image: sneaker4,
    tag: 'Sale',
    category: 'Retro',
  },
  {
    id: 5,
    name: 'Tech Runner',
    description: 'Future-forward technology',
    price: 249,
    image: sneaker5,
    tag: 'New',
    category: 'Running',
  },
  {
    id: 6,
    name: 'Classic Luxe',
    description: 'Timeless elegance redefined',
    price: 179,
    image: sneaker6,
    tag: 'Popular',
    category: 'Lifestyle',
  },
  {
    id: 7,
    name: 'Urban Street',
    description: 'Own the streets in style',
    price: 169,
    image: sneaker1,
    category: 'Lifestyle',
  },
  {
    id: 8,
    name: 'Sprint Master',
    description: 'Built for speed and agility',
    price: 199,
    image: sneaker2,
    category: 'Athletic',
  },
  {
    id: 9,
    name: 'Air Flow Max',
    description: 'Maximum breathability and comfort',
    price: 219,
    image: sneaker3,
    tag: 'New',
    category: 'Running',
  },
  {
    id: 10,
    name: 'Heritage Classic',
    description: 'Vintage style, modern soul',
    price: 139,
    originalPrice: 189,
    image: sneaker4,
    tag: 'Sale',
    category: 'Retro',
  },
  {
    id: 11,
    name: 'Dynamic Flex',
    description: 'Flex with every move',
    price: 179,
    image: sneaker5,
    category: 'Athletic',
  },
  {
    id: 12,
    name: 'Comfort Zone',
    description: 'All-day comfort guaranteed',
    price: 159,
    image: sneaker6,
    tag: 'Popular',
    category: 'Lifestyle',
  },
  {
    id: 13,
    name: 'Speed Racer',
    description: 'Designed for champions',
    price: 269,
    image: sneaker1,
    tag: 'Limited',
    category: 'Running',
  },
  {
    id: 14,
    name: 'Court Classic',
    description: 'From the court to the street',
    price: 189,
    image: sneaker2,
    category: 'Athletic',
  },
  {
    id: 15,
    name: 'Urban Wanderer',
    description: 'Explore the city in style',
    price: 149,
    image: sneaker3,
    category: 'Lifestyle',
  },
  {
    id: 16,
    name: 'Throwback 90s',
    description: 'Nostalgia meets innovation',
    price: 129,
    originalPrice: 169,
    image: sneaker4,
    tag: 'Sale',
    category: 'Retro',
  },
];

const categories = ['All', 'Running', 'Athletic', 'Lifestyle', 'Retro'];
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $150', min: 0, max: 150 },
  { label: '$150 - $200', min: 150, max: 200 },
  { label: '$200 - $250', min: 200, max: 250 },
  { label: 'Over $250', min: 250, max: Infinity },
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'newest'>('featured');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by price range
    const range = priceRanges[selectedPriceRange];
    filtered = filtered.filter(p => p.price >= range.min && p.price < range.max);

    // Sort products
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      filtered = filtered.filter(p => p.tag === 'New').concat(filtered.filter(p => p.tag !== 'New'));
    }

    return filtered;
  }, [selectedCategory, selectedPriceRange, sortBy]);

  const activeFiltersCount = (selectedCategory !== 'All' ? 1 : 0) + (selectedPriceRange !== 0 ? 1 : 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Banner */}
      <section className="pt-24 pb-16 px-4 bg-gradient-subtle">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter mb-6">
              Shop All
            </h1>
            <p className="text-xl font-light text-muted-foreground mb-8">
              Discover our complete collection of premium sneakers. From street style to athletic performance, find your perfect pair.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 border-b border-border sticky top-16 bg-background/95 backdrop-blur-sm z-40">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4 flex-wrap">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-xs">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
              
              {/* Category Pills */}
              <div className="flex items-center gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === selectedCategory ? 'default' : 'ghost'}
                    size="sm"
                    className="font-light"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-sm font-light bg-background border border-border rounded-md px-3 py-1.5 cursor-pointer hover:border-foreground/20 transition-colors"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </motion.div>

          {/* Expandable Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 pt-6 border-t border-border"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price Range Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Price Range</h3>
                  <div className="flex flex-wrap gap-2">
                    {priceRanges.map((range, index) => (
                      <Button
                        key={index}
                        variant={selectedPriceRange === index ? 'default' : 'outline'}
                        size="sm"
                        className="font-light"
                        onClick={() => setSelectedPriceRange(index)}
                      >
                        {range.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Active Filters Summary */}
                {activeFiltersCount > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-3">Active Filters</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategory !== 'All' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-sm">
                          Category: {selectedCategory}
                          <button
                            onClick={() => setSelectedCategory('All')}
                            className="hover:text-foreground transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      )}
                      {selectedPriceRange !== 0 && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-sm">
                          {priceRanges[selectedPriceRange].label}
                          <button
                            onClick={() => setSelectedPriceRange(0)}
                            className="hover:text-foreground transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4 flex-1">
        <div className="container mx-auto">
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredProducts.length}</span> products
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">No products found</p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedPriceRange(0);
                }}
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                >
                  <Card className="group bg-card border-border hover:border-foreground/20 transition-all duration-200 overflow-hidden h-full">
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="relative overflow-hidden">
                        {product.tag && (
                          <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded text-xs font-normal ${
                            product.tag === 'Sale' 
                              ? 'bg-red-500 text-white' 
                              : 'bg-foreground text-background'
                          }`}>
                            {product.tag}
                          </div>
                        )}
                        <div className="aspect-square overflow-hidden bg-gradient-card">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/placeholder.svg'; }}
                          />
                        </div>
                      </div>
                      
                      <div className="p-5 flex flex-col flex-1">
                        <span className="text-xs text-muted-foreground mb-1">{product.category}</span>
                        <h3 className="text-lg font-normal mb-1 tracking-tight">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 flex-1">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-light">${product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                          <AddToCartButton productId={product.id} onAdded={() => {}} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
