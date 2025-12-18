const mongoose = require('mongoose');
const Product = require('./models/product');
const products = [
  { name: 'Puma RS-X', price: 135, image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/369579/01/sv01/fnd/PNA/w/1000/h/1000/fmt/png/puma-rs-x-shoe.png', description: 'Chunky retro runner.', category: 'Running' },
  { name: 'Puma Mirage', price: 175, image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/375167/01/sv01/fnd/PNA/w/1000/h/1000/fmt/png/puma-mirage-shoe.png', description: 'Retro-inspired everyday sneaker.', category: 'Lifestyle' },
  { name: 'Puma Smash', price: 60, image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/356722/01/sv01/fnd/PNA/w/1000/h/1000/fmt/png/puma-smash-shoe.png', description: 'Tennis-inspired classic.', category: 'Athletic' },
  { name: 'Puma Cali', price: 90, image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/369155/01/sv01/fnd/PNA/w/1000/h/1000/fmt/png/puma-cali-shoe.png', description: 'West Coast vibes.', category: 'Lifestyle' },
  { name: 'Puma Suede Classic', price: 80, image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/352634/75/sv01/fnd/PNA/w/1000/h/1000/fmt/png/puma-suede-classic-shoe.png', description: 'Iconic suede sneaker.', category: 'Retro' },
  { name: 'Puma Future Rider', price: 110, image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/372838/01/sv01/fnd/PNA/w/1000/h/1000/fmt/png/puma-future-rider-shoe.png', description: 'Colorful retro runner.', category: 'Running' },
  { name: 'Puma Roma', price: 70, image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/353572/01/sv01/fnd/PNA/w/1000/h/1000/fmt/png/puma-roma-shoe.png', description: 'Classic track shoe.', category: 'Athletic' },
  { name: 'Puma Basket Classic', price: 75, image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/354367/01/sv01/fnd/PNA/w/1000/h/1000/fmt/png/puma-basket-classic-shoe.png', description: 'Timeless basketball style.', category: 'Athletic' },
  { name: 'Puma Cell Endura', price: 120, image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/369357/01/sv01/fnd/PNA/w/1000/h/1000/fmt/png/puma-cell-endura-shoe.png', description: '90s running tech.', category: 'Running' },
  { name: 'Puma RS-2K', price: 130, image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/373309/01/sv01/fnd/PNA/w/1000/h/1000/fmt/png/puma-rs-2k-shoe.png', description: 'Futuristic chunky sneaker.', category: 'Lifestyle' },
  { name: 'Puma LQDCell', price: 115, image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/192560/01/sv01/fnd/PNA/w/1000/h/1000/fmt/png/puma-lqdcell-shoe.png', description: 'Cushioned trainer.', category: 'Athletic' },
  { name: 'Puma Rider Play On', price: 105, image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/371150/01/sv01/fnd/PNA/w/1000/h/1000/fmt/png/puma-rider-play-on-shoe.png', description: 'Retro running style.', category: 'Running' },
  { name: 'Nike Air Force 1', price: 120, image: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/7b2e2e2e-2e2e-4e2e-8e2e-2e2e2e2e2e2e/air-force-1-07-shoes.png', description: 'Classic Nike basketball shoe.', category: 'Athletic' },
  { name: 'Nike Air Max 90', price: 130, image: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/8b8b8b8b-8b8b-4b8b-8b8b-8b8b8b8b8b8b/air-max-90-shoes.png', description: 'Iconic running sneaker.', category: 'Running' },
  { name: 'Nike Dunk Low', price: 110, image: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/9c9c9c9c-9c9c-4c9c-9c9c-9c9c9c9c9c9c/dunk-low-shoes.png', description: 'Skateboarding classic.', category: 'Lifestyle' },
  { name: 'Nike Blazer Mid', price: 115, image: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/1d1d1d1d-1d1d-4d1d-1d1d-1d1d1d1d1d1d/blazer-mid-shoes.png', description: 'Vintage basketball style.', category: 'Retro' }
];

mongoose.connect('mongodb://localhost:27017/it340db').then(async () => {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Products seeded');
  process.exit();
});
