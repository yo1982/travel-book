import React from 'react';
import { Flight } from '../types';
import { PlaneIcon } from './icons/PlaneIcon';
import { ClockIcon } from './icons/ClockIcon';

interface FlightCardProps {
    flight: Flight;
    onBook: (flight: Flight) => void;
}

export const FlightCard: React.FC<FlightCardProps> = ({ flight, onBook }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="md:flex">
                <div className="p-8 w-full">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-full">
                                <PlaneIcon className="h-6 w-6 text-blue-600" />
                            </div>
                            <span className="text-lg font-bold text-gray-800">{flight.airline}</span>
                            <span className="text-sm text-gray-500">({flight.flightNumber})</span>
                        </div>
                        <div className="text-right">
                             <p className="text-2xl font-bold text-blue-600">SAR {flight.price.toLocaleString()}</p>
                             <p className="text-sm text-gray-500">per passenger</p>
                        </div>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-3 items-center text-center">
                        <div>
                            <p className="text-2xl font-semibold text-gray-900">{flight.departure.time}</p>
                            <p className="text-sm text-gray-600">{flight.departure.airport}</p>
                        </div>
                        
                        <div className="text-gray-500">
                            <div className="flex items-center justify-center space-x-2 text-sm">
                                <ClockIcon className="h-4 w-4" />
                                <span>{flight.duration}</span>
                            </div>
                            <div className="relative my-1">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-300 border-dashed"></div>
                                </div>
                            </div>
                            <p className="text-xs">Non-stop</p>
                        </div>

                        <div>
                            <p className="text-2xl font-semibold text-gray-900">{flight.arrival.time}</p>
                            <p className="text-sm text-gray-600">{flight.arrival.airport}</p>
                        </div>
                    </div>
                    <div className="mt-6 text-right">
                         <button onClick={() => onBook(flight)} className="bg-orange-500 text-white font-bold py-2 px-6 rounded-full hover:bg-orange-600 transition-colors duration-200">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
