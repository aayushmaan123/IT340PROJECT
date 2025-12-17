const products = [
  {
    name: 'Sky Force Elite',
    price: 189,
    image: '/images/shoes/sneaker-1.jpg',
    description: 'High-top sneaker with premium materials.'
  },
  {
    name: 'Velocity Pro',
    price: 159,
    image: '/images/shoes/sneaker-1.jpg', // Repeated image
    description: 'Lightweight running shoe for speed.'
  },
  {
    name: 'Cloud Walker',
    price: 229,
    image: '/images/shoes/sneaker-1.jpg', // Repeated image
    description: 'Cushioned comfort for all-day wear.'
  },
  {
    name: 'Retro Legend',
    price: 199,
    image: '/images/shoes/sneaker-1.jpg', // Repeated image
    description: 'Classic style with modern updates.'
  }
];

await Product.insertMany(products);