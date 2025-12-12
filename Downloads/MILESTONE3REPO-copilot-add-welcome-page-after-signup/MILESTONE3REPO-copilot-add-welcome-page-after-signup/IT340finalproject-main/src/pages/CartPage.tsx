import { useEffect, useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';

const CartPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }
    fetch('http://localhost:5000/api/cart', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(res => res.json())
      .then(data => {
        setItems(data.items || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8">Your Cart</h1>
        {loading ? (
          <div>Loading...</div>
        ) : items.length === 0 ? (
          <div>Your cart is empty.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {items.map((item, idx) => (
              <div key={idx} className="bg-card border border-border rounded-lg shadow-elegant p-4 flex flex-col items-center">
                <img src={item.productId.image || '/images/shoes/placeholder.jpg'} alt={item.productId.name} className="w-40 h-40 object-cover mb-4 rounded-md" />
                <div className="font-semibold text-lg mb-2">{item.productId.name}</div>
                <div className="text-primary text-xl font-bold mb-2">${item.productId.price}</div>
                <div className="mb-2">Quantity: {item.quantity}</div>
                <Button>Buy Now</Button>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
