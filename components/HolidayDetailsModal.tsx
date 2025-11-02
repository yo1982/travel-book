import React from 'react';
import { HolidayPackage } from '../types';
import { StarIcon } from './icons/StarIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface HolidayDetailsModalProps {
    pkg: HolidayPackage;
    itinerary: { day: string; title: string; description: string }[] | null;
    isItineraryLoading: boolean;
    onClose: () => void;
    onBook: () => void;
}

const HolidayDetailsModal: React.FC<HolidayDetailsModalProps> = ({ pkg, itinerary, isItineraryLoading, onClose, onBook }) => {
    if (!pkg) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="relative">
                    <img src={pkg.imageUrl} alt={pkg.title} className="w-full h-64 object-cover rounded-t-xl" />
                     <button onClick={onClose} className="absolute top-4 right-4 bg-white/70 rounded-full p-2 hover:bg-white transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-8">
                     <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">{pkg.title}</h2>
                            <p className="text-md text-gray-500 mt-1">{pkg.destination} &bull; {pkg.duration}</p>
                            <div className="flex items-center mt-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <StarIcon key={i} className={`h-6 w-6 ${i < pkg.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                                ))}
                            </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                            <p className="text-sm text-gray-500">Starting from</p>
                            <p className="text-3xl font-bold text-blue-600">SAR {pkg.price.toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="mt-6 border-t pt-6">
                        <h3 className="text-xl font-semibold text-gray-800">About this package</h3>
                        <p className="mt-2 text-gray-600">{pkg.description}</p>
                    </div>

                    <div className="mt-6 border-t pt-6">
                        <h3 className="text-xl font-semibold text-gray-800">What's Included</h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-gray-700">
                           {pkg.includes.map((item, index) => (
                               <li key={index} className="flex items-center">
                                   <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                   <span>{item}</span>
                               </li>
                           ))}
                        </ul>
                    </div>

                    <div className="mt-6 border-t pt-6">
                        <h3 className="text-xl font-semibold text-gray-800">Day-by-Day Itinerary</h3>
                        {isItineraryLoading && (
                            <div className="flex justify-center items-center py-10">
                                <SpinnerIcon className="h-8 w-8 text-blue-600" />
                                <p className="ml-3 text-gray-600">Generating your personalized itinerary...</p>
                            </div>
                        )}
                        {itinerary && (
                            <div className="mt-4 space-y-6">
                                {itinerary.map((item, index) => (
                                    <div key={index} className="flex">
                                        <div className="flex-shrink-0 mr-4">
                                            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                                                {item.day.split(' ')[1] || index + 1}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-800">{item.title}</h4>
                                            <p className="mt-1 text-gray-600">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
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

export default HolidayDetailsModal;