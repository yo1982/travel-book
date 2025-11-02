import React from 'react';
import { Hotel } from '../types';
import { StarIcon } from './icons/StarIcon';

interface HotelCardProps {
    hotel: Hotel;
    onViewDetails: (hotel: Hotel) => void;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel, onViewDetails }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 md:flex">
            <div className="md:flex-shrink-0">
                <img className="h-48 w-full object-cover md:h-full md:w-64" src={hotel.imageUrl} alt={hotel.name} />
            </div>
            <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">{hotel.name}</h3>
                            <div className="flex items-center mt-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <StarIcon key={i} className={`h-5 w-5 ${i < hotel.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                                ))}
                                <span className="ml-2 text-sm text-gray-600">{hotel.rating.toFixed(1)} stars</span>
                            </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                            <p className="text-2xl font-bold text-blue-600">SAR {hotel.pricePerNight.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">per night</p>
                        </div>
                    </div>

                    <div className="mt-4">
                        <p className="font-semibold text-gray-700">Top Amenities:</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {hotel.amenities.slice(0, 4).map((amenity, index) => (
                                <span key={index} className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">{amenity}</span>
                            ))}
                            {hotel.amenities.length > 4 && <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">+{hotel.amenities.length - 4} more</span>}
                        </div>
                    </div>
                </div>
                
                <div className="mt-6 text-right">
                    <button onClick={() => onViewDetails(hotel)} className="bg-orange-500 text-white font-bold py-2 px-6 rounded-full hover:bg-orange-600 transition-colors duration-200">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};
