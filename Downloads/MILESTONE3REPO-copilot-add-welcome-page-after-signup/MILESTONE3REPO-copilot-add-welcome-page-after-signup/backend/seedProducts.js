const mongoose = require('mongoose');
const Product = require('./models/product');
const products = [
  { name: 'Air Max Nova', price: 220, image: '/images/shoes/air-max-nova.jpg' },
  { name: 'Jordan Eclipse', price: 199, image: '/images/shoes/jordan-eclipse.jpg' },
  { name: 'Yeezy Boost 350 V3', price: 240, image: '/images/shoes/yeezy-boost-350-v3.jpg' },
  { name: 'Nike React Vision', price: 185, image: '/images/shoes/nike-react-vision.jpg' },
  { name: 'Adidas ZX 2K', price: 160, image: '/images/shoes/adidas-zx-2k.jpg' },
  { name: 'Puma Mirage', price: 175, image: '/images/shoes/puma-mirage.jpg' },
  { name: 'Nike Dunk Low', price: 150, image: '/images/shoes/nike-dunk-low.jpg' },
  { name: 'Adidas NMD R1', price: 170, image: '/images/shoes/adidas-nmd-r1.jpg' },
  { name: 'Jordan 1 Mid', price: 180, image: '/images/shoes/jordan-1-mid.jpg' },
  { name: 'Yeezy Slide', price: 120, image: '/images/shoes/yeezy-slide.jpg' },
  { name: 'Puma RS-X', price: 135, image: '/images/shoes/puma-rs-x.jpg' },
  { name: 'New Balance 550', price: 160, image: '/images/shoes/nb-550.jpg' },
  { name: 'Nike Air Monarch', price: 90, image: '/images/shoes/nike-air-monarch.jpg' },
  { name: 'Adidas Lite Racer', price: 75, image: '/images/shoes/adidas-lite-racer.jpg' },
  { name: 'Puma Smash', price: 60, image: '/images/shoes/puma-smash.jpg' },
  { name: 'Reebok Classic', price: 110, image: '/images/shoes/reebok-classic.jpg' },
  { name: 'Vans Old Skool', price: 85, image: '/images/shoes/vans-old-skool.jpg' },
  { name: 'Converse Chuck Taylor', price: 70, image: '/images/shoes/converse-chuck-taylor.jpg' }
];

mongoose.connect('mongodb://localhost:27017/it340db').then(async () => {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Products seeded');
  process.exit();
});
