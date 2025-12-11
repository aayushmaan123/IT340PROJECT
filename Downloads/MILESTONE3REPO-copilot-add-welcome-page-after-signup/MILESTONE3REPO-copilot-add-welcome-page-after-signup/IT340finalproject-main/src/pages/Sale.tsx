import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';

const saleShoes = [
  { name: 'Nike Air Monarch', img: '/images/shoes/nike-air-monarch.jpg', price: '$90' },
  { name: 'Adidas Lite Racer', img: '/images/shoes/adidas-lite-racer.jpg', price: '$75' },
  { name: 'Puma Smash', img: '/images/shoes/puma-smash.jpg', price: '$60' },
  { name: 'Reebok Classic', img: '/images/shoes/reebok-classic.jpg', price: '$110' },
  { name: 'Vans Old Skool', img: '/images/shoes/vans-old-skool.jpg', price: '$85' },
  { name: 'Converse Chuck Taylor', img: '/images/shoes/converse-chuck-taylor.jpg', price: '$70' },
];

const Sale = () => (
  <div className="min-h-screen flex flex-col">
    <Navigation />
    <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold">Sale</h1>
        <Button asChild variant="outline">
          <a href="/">Back to Home</a>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {saleShoes.map((shoe) => (
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

export default Sale;
