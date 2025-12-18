import { useEffect, useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import AddToCartButton from '@/components/AddToCartButton';

type Product = {
  _id: string;
  name: string;
  price: number;
  image?: string;
};

const Trending = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    console.log('Backend URL:', backendUrl); // ✅ debug check

    fetch(`${backendUrl}/api/products`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold">Trending</h1>
          <Button asChild variant="outline">
            <a href="/">Back to Home</a>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.slice(8, 16).map((product) => (
            <div
              key={product._id}
              className="bg-card border border-border rounded-lg shadow-elegant p-4 flex flex-col items-center"
            >
              <img
                src={product.image ? product.image : '/puma-fallback.jpg'}
                alt={product.name}
                className="w-40 h-40 object-cover mb-4 rounded-md"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/puma-fallback.jpg';
                }}
              />

              <div className="font-semibold text-lg mb-2">
                {product.name}
              </div>

              <div className="text-primary text-xl font-bold mb-2">
                ${product.price}
              </div>

              <AddToCartButton
                productId={product._id}
                onAdded={() => {}}
              />
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Trending;
