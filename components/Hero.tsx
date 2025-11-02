
import React from 'react';
import BookingForm from './BookingForm';
import { SearchType } from '../types';

interface HeroProps {
  onSearch: (type: SearchType, params: Record<string, string>) => void;
  isLoading: boolean;
}

const Hero: React.FC<HeroProps> = ({ onSearch, isLoading }) => {
  return (
    <div className="relative bg-cover bg-center h-[550px] md:h-[600px] lg:h-[650px]" style={{ backgroundImage: "url('https://picsum.photos/1920/1080?travel,landscape')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-4">
          Your Journey Starts Here
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8">
          Discover and book flights, hotels, and holiday packages at the best prices.
        </p>
        <BookingForm onSearch={onSearch} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Hero;
