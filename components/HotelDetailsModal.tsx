import React from 'react';
import { Hotel } from '../types';
import { StarIcon } from './icons/StarIcon';

interface HotelDetailsModalProps {
    hotel: Hotel;
    onClose: () => void;
    onBook: () => void;
}

const HotelDetailsModal: React.FC<HotelDetailsModalProps> = ({ hotel, onClose, onBook }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="relative">
                    <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-64 object-cover rounded-t-xl" />
                     <button onClick={onClose} className="absolute top-4 right-4 bg-white/70 rounded-full p-2 hover:bg-white transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-8">
                     <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">{hotel.name}</h2>
                            <div className="flex items-center mt-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <StarIcon key={i} className={`h-6 w-6 ${i < hotel.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                                ))}
                                <span className="ml-2 text-md text-gray-600">{hotel.rating.toFixed(1)} stars</span>
                            </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                            <p className="text-3xl font-bold text-blue-600">SAR {hotel.pricePerNight.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">per night</p>
                        </div>
                    </div>

                    <div className="mt-6 border-t pt-6">
                        <h3 className="text-xl font-semibold text-gray-800">About this hotel</h3>
                        <p className="mt-2 text-gray-600">{hotel.description}</p>
                    </div>

                    <div className="mt-6 border-t pt-6">
                        <h3 className="text-xl font-semibold text-gray-800">Amenities</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 text-gray-700">
                           {hotel.amenities.map((amenity, index) => (
                               <div key={index} className="flex items-center">
                                   <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                   <span>{amenity}</span>
                               </div>
                           ))}
                        </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t flex justify-end">
                         <button onClick={onBook} className="bg-orange-500 text-white font-bold py-3 px-8 rounded-full hover:bg-orange-600 transition-colors duration-200 text-lg">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelDetailsModal;
