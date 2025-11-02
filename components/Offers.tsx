
import React from 'react';

const offers = [
  { id: 1, title: 'Summer in Maldives', price: 'SAR 3,500', image: 'https://picsum.photos/400/300?travel,beach' },
  { id: 2, title: 'Explore Istanbul', price: 'SAR 1,800', image: 'https://picsum.photos/400/300?travel,city' },
  { id: 3, title: 'Adventures in London', price: 'SAR 4,200', image: 'https://picsum.photos/400/300?travel,london' },
  { id: 4, title: 'Parisian Getaway', price: 'SAR 4,500', image: 'https://picsum.photos/400/300?travel,paris' },
];

const OfferCard: React.FC<{ offer: typeof offers[0] }> = ({ offer }) => (
    <div className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white">
        <div className="overflow-hidden">
            <img src={offer.image} alt={offer.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div className="p-4">
            <h3 className="text-lg font-bold text-gray-800">{offer.title}</h3>
            <p className="text-sm text-gray-500 mt-1">Starting from</p>
            <p className="text-xl font-bold text-blue-600">{offer.price}</p>
            <button className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                View Deal
            </button>
        </div>
    </div>
);

const Offers: React.FC = () => {
  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Exclusive Offers</h2>
          <p className="mt-4 text-lg leading-6 text-gray-600">Unbeatable deals for your next adventure.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {offers.map(offer => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offers;
