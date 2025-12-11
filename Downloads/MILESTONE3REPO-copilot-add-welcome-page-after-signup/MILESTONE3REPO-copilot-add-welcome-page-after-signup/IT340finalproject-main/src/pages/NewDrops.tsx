import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';

const newDrops = [
  { name: 'Air Max Nova', img: '/images/shoes/air-max-nova.jpg', price: '$220' },
  { name: 'Jordan Eclipse', img: '/images/shoes/jordan-eclipse.jpg', price: '$199' },
  { name: 'Yeezy Boost 350 V3', img: '/images/shoes/yeezy-boost-350-v3.jpg', price: '$240' },
  { name: 'Nike React Vision', img: '/images/shoes/nike-react-vision.jpg', price: '$185' },
  { name: 'Adidas ZX 2K', img: '/images/shoes/adidas-zx-2k.jpg', price: '$160' },
  { name: 'Puma Mirage', img: '/images/shoes/puma-mirage.jpg', price: '$175' },
];

const NewDrops = () => (
  <div className="min-h-screen flex flex-col">
    <Navigation />
    <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold">New Drops</h1>
        <Button asChild variant="outline">
          <a href="/">Back to Home</a>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {newDrops.map((shoe) => (
          <div key={shoe.name} className="bg-card border border-border rounded-lg shadow-elegant p-4 flex flex-col items-center">
            <img src={shoe.img} alt={shoe.name} className="w-40 h-40 object-cover mb-4 rounded-md" />
            <div className="font-semibold text-lg mb-2">{shoe.name}</div>
            <div className="text-primary text-xl font-bold">{shoe.price}</div>
          </div>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default NewDrops;
