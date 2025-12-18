const mongoose = require('mongoose');
const Product = require('../models/product');

const products = [
  {
    name: 'Sky Force Elite',
    price: 189,
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
    description: 'A high-top sneaker with premium materials and bold style.',
    category: 'Athletic'
  },
  {
    name: 'Velocity Pro',
    price: 159,
    image: 'https://images.unsplash.com/photo-1528701800484-905909b7c7b2?auto=format&fit=crop&w=400&q=80',
    description: 'Lightweight and responsive for everyday wear.',
    category: 'Athletic'
  },
  {
    name: 'Cloud Walker',
    price: 229,
    image: 'https://images.unsplash.com/photo-1517263904808-5dc0d6e1ad8b?auto=format&fit=crop&w=400&q=80',
    description: 'Maximum comfort and cushioning for long days.',
    category: 'Lifestyle'
  },
  {
    name: 'Retro Legend',
    price: 199,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    description: 'Classic design with a modern twist.',
    category: 'Retro'
  },
  {
    name: 'Tech Runner',
    price: 249,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    description: 'Engineered for speed and agility.',
    category: 'Running'
  },
  {
    name: 'Classic Luxe',
    price: 179,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    description: 'Timeless style with luxury materials.',
    category: 'Lifestyle'
  },
  {
    name: 'Urban Street',
    price: 169,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    description: 'Own the streets in style.',
    category: 'Lifestyle'
  },
  {
    name: 'Sprint Master',
    price: 199,
    image: 'https://images.unsplash.com/photo-1512257752821-41c2f6a4a7c2?auto=format&fit=crop&w=400&q=80',
    description: 'Built for speed and agility.',
    category: 'Athletic'
  },
  {
    name: 'Air Flow Max',
    price: 219,
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    description: 'Maximum breathability and comfort.',
    category: 'Running'
  },
  {
    name: 'Heritage Classic',
    price: 139,
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
    description: 'Vintage style, modern soul.',
    category: 'Retro'
  },
  {
    name: 'Dynamic Flex',
    price: 179,
    image: 'https://images.unsplash.com/photo-1528701800484-905909b7c7b2?auto=format&fit=crop&w=400&q=80',
    description: 'Flex with every move.',
    category: 'Athletic'
  },
  {
    name: 'Comfort Zone',
    price: 159,
    image: 'https://images.unsplash.com/photo-1517263904808-5dc0d6e1ad8b?auto=format&fit=crop&w=400&q=80',
    description: 'All-day comfort guaranteed.',
    category: 'Lifestyle'
  },
  {
    name: 'Speed Racer',
    price: 269,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    description: 'Designed for champions.',
    category: 'Running'
  },
  {
    name: 'Court Classic',
    price: 189,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    description: 'From the court to the street.',
    category: 'Athletic'
  },
  {
    name: 'Urban Wanderer',
    price: 149,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    description: 'Explore the city in style.',
    category: 'Lifestyle'
  },
  {
    name: 'Throwback 90s',
    price: 129,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    description: 'Nostalgia meets innovation.',
    category: 'Retro'
  },
  // Additional Running
  {
    name: 'Ultra Boost X',
    price: 210,
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?auto=format&fit=crop&w=400&q=80',
    description: 'Responsive running shoe for long distances.',
    category: 'Running'
  },
  {
    name: 'Zoom Fly 5',
    price: 180,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    description: 'Lightweight and fast for race day.',
    category: 'Running'
  },
  // Additional Athletic
  {
    name: 'Power Trainer',
    price: 155,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    description: 'Versatile trainer for gym and crossfit.',
    category: 'Athletic'
  },
  {
    name: 'Agility Ace',
    price: 165,
    image: 'https://images.unsplash.com/photo-1517260911205-8a3b66e1a8df?auto=format&fit=crop&w=400&q=80',
    description: 'Built for quick moves and support.',
    category: 'Athletic'
  },
  // Additional Lifestyle
  {
    name: 'City Walker',
    price: 120,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    description: 'Casual comfort for everyday city life.',
    category: 'Lifestyle'
  },
  {
    name: 'Street Icon',
    price: 140,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    description: 'Iconic style for the modern urbanite.',
    category: 'Lifestyle'
  }
];

async function seed() {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Database seeded with products!');
  process.exit();
}

seed();