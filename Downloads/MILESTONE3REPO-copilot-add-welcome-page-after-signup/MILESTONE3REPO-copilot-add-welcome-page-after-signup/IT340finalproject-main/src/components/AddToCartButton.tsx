import { useState } from 'react';
import { Button } from '@/components/ui/button';

const AddToCartButton = ({ productId, onAdded }) => {
  const [added, setAdded] = useState(false);

  const handleAdd = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to add to cart');
      return;
    }
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ productId })
    });
    setAdded(true);
    if (onAdded) onAdded();
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <Button onClick={handleAdd} className="relative">
      {added && (
        <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-green-500 text-white px-3 py-1 rounded shadow animate-bounce z-10">
          Added to cart
        </span>
      )}
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
