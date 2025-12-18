import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { FeaturedSection } from '@/components/FeaturedSection';
import { CategorySection } from '@/components/CategorySection';
import { AboutSection } from '@/components/AboutSection';
import { Footer } from '@/components/Footer';
import AddToCartButton from '@/components/AddToCartButton';

const Index = () => {
  const products = [
    // Sample product data
    {
      _id: '1',
      name: 'Product 1',
      price: 29.99,
      image: '/images/product1.jpg',
    },
    {
      _id: '2',
      name: 'Product 2',
      price: 39.99,
      image: '/images/product2.jpg',
    },
    {
      _id: '3',
      name: 'Product 3',
      price: 49.99,
      image: '/images/product3.jpg',
    },
    {
      _id: '4',
      name: 'Product 4',
      price: 59.99,
      image: '/images/product4.jpg',
    },
    {
      _id: '5',
      name: 'Product 5',
      price: 69.99,
      image: '/images/product5.jpg',
    },
    {
      _id: '6',
      name: 'Product 6',
      price: 79.99,
      image: '/images/product6.jpg',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturedSection />
      <CategorySection />
      <AboutSection />
      <Footer />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 6).map((product) => (
            <div key={product._id} className="bg-card border border-border rounded-lg shadow-elegant p-4 flex flex-col items-center">
              <img
                src={product.image ? product.image : '/puma-fallback.jpg'}
                alt={product.name}
                className="w-40 h-40 object-cover mb-4 rounded-md"
                onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/puma-fallback.jpg'; }}
              />
              <div className="font-semibold text-lg mb-2">{product.name}</div>
              <div className="text-primary text-xl font-bold mb-2">${product.price}</div>
              <AddToCartButton productId={product._id} onAdded={() => { /* handle item added to cart */ }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
