import { useEffect, useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const CartPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }
    fetch('http://192.168.50.128:5000/api/cart', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(res => res.json())
      .then(data => {
        setItems(data.items || []);
        setLoading(false);
      });
  }, []);

  const handleRemove = async (productId: string) => {
    setRemoving(productId);
    const token = localStorage.getItem('token');
    await fetch('http://192.168.50.128:5000/api/cart/remove', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ productId })
    });
    setTimeout(() => {
      setItems(items => items.filter(item => item.productId._id !== productId));
      setRemoving(null);
    }, 400); // match animation duration
  };

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
            <AnimatePresence>
              {items.map((item, idx) => (
                <motion.div
                  key={item.productId._id}
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.4 }}
                  className="bg-card border border-border rounded-lg shadow-elegant p-4 flex flex-col items-center relative"
                >
                  <img src={item.productId.image || '/images/shoes/placeholder.jpg'} alt={item.productId.name} className="w-40 h-40 object-cover mb-4 rounded-md" />
                  <div className="font-semibold text-lg mb-2">{item.productId.name}</div>
                  <div className="text-primary text-xl font-bold mb-2">${item.productId.price}</div>
                  <div className="mb-2">Quantity: {item.quantity}</div>
                  <div className="flex gap-2 w-full justify-center">
                    <Button>Buy Now</Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemove(item.productId._id)}
                      disabled={removing === item.productId._id}
                      className="transition-all duration-300"
                    >
                      {removing === item.productId._id ? 'Removing...' : 'Remove'}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
