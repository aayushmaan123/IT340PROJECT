import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';

const trendingShoes = [
  { name: 'Nike Dunk Low', img: '/images/shoes/nike-dunk-low.jpg', price: '$150' },
  { name: 'Adidas NMD R1', img: '/images/shoes/adidas-nmd-r1.jpg', price: '$170' },
  { name: 'Jordan 1 Mid', img: '/images/shoes/jordan-1-mid.jpg', price: '$180' },
  { name: 'Yeezy Slide', img: '/images/shoes/yeezy-slide.jpg', price: '$120' },
  { name: 'Puma RS-X', img: '/images/shoes/puma-rs-x.jpg', price: '$135' },
  { name: 'New Balance 550', img: '/images/shoes/nb-550.jpg', price: '$160' },
];

const Trending = () => (
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
        {trendingShoes.map((shoe) => (
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

export default Trending;
