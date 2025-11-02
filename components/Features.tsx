
import React from 'react';
import { TagIcon } from './icons/TagIcon';
import { HeadsetIcon } from './icons/HeadsetIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';

const FeatureItem: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="text-center p-4">
    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
    <p className="mt-1 text-gray-600">{description}</p>
  </div>
);

const Features: React.FC = () => {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Why Book With Us?</h2>
            <p className="mt-4 text-lg leading-6 text-gray-600">Experience travel booking like never before.</p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-3">
          <FeatureItem 
            icon={<TagIcon className="h-8 w-8" />}
            title="Best Price Guarantee"
            description="Find the lowest prices on flights and hotels, backed by our guarantee."
          />
          <FeatureItem 
            icon={<HeadsetIcon className="h-8 w-8" />}
            title="24/7 Customer Support"
            description="Our dedicated team is here to help you around the clock."
          />
          <FeatureItem 
            icon={<ShieldCheckIcon className="h-8 w-8" />}
            title="Secure & Easy Booking"
            description="Book with confidence using our secure and user-friendly platform."
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
