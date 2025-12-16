import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import placeholder from '/placeholder.svg';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return setLoading(false);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
      headers: { 'Authorization': 'Bearer ' + token },
    })
      .then(res => res.json())
      .then(data => {
        setCart(data);
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
        ) : !cart || !cart.items || cart.items.length === 0 ? (
          <div>Your cart is empty.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {cart.items.map((item) => (
              <div key={item.productId?._id || item.productId} className="bg-card border border-border rounded-lg shadow-elegant p-4 flex flex-col items-center">
                <img src={item.productId?.image || placeholder} alt={item.productId?.name || 'Product'} className="w-40 h-40 object-cover mb-4 rounded-md" onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = placeholder; }} />
                <div className="font-semibold text-lg mb-2">{item.productId?.name || 'Product'}</div>
                <div className="text-primary text-xl font-bold">Qty: {item.quantity}</div>
                <Button size="sm" className="mt-2">Buy Now</Button>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
