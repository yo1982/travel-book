import React from 'react';
import { Flight, Hotel, HolidayPackage } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { PlaneIcon } from './icons/PlaneIcon';
import { BedIcon } from './icons/BedIcon';
import { PalmTreeIcon } from './icons/PalmTreeIcon';

interface ModalProps {
    flight?: Flight;
    hotel?: Hotel;
    holiday?: HolidayPackage;
    onClose: () => void;
}

const BookingConfirmationModal: React.FC<ModalProps> = ({ flight, hotel, holiday, onClose }) => {
    const item = flight || hotel || holiday;
    if (!item) return null;

    const isFlight = !!flight;
    const isHotel = !!hotel;
    const isHoliday = !!holiday;

    const getTitle = () => {
        if (isFlight) return flight.airline;
        if (isHotel) return hotel.name;
        if (isHoliday) return holiday.title;
        return '';
    }

    const getIcon = () => {
        if (isFlight) return <PlaneIcon className="h-5 w-5 mr-2 text-blue-600"/>;
        if (isHotel) return <BedIcon className="h-5 w-5 mr-2 text-blue-600" />;
        if (isHoliday) return <PalmTreeIcon className="h-5 w-5 mr-2 text-blue-600" />;
        return null;
    }


    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl p-8 m-4 max-w-lg w-full transform transition-all duration-300 ease-out scale-95 hover:scale-100" onClick={(e) => e.stopPropagation()}>
                <div className="text-center">
                    <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto" />
                    <h2 className="mt-4 text-2xl font-bold text-gray-900">Booking Confirmed!</h2>
                    <p className="mt-2 text-gray-600">Your trip is booked. Thank you for choosing us.</p>
                </div>

                <div className="mt-6 border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        {getIcon()}
                        {getTitle()}
                    </h3>
                    
                    {isFlight && (
                        <div className="mt-4 text-sm space-y-2 text-gray-700">
                           <p><strong>From:</strong> {flight.departure.airport}</p>
                           <p><strong>To:</strong> {flight.arrival.airport}</p>
                           <p><strong>Price:</strong> <span className="font-bold text-blue-700">SAR {flight.price.toLocaleString()}</span></p>
                        </div>
                    )}
                    
                    {isHotel && (
                         <div className="mt-4 text-sm space-y-2 text-gray-700">
                           <p><strong>Rating:</strong> {hotel.rating.toFixed(1)} Stars</p>
                           <p><strong>Price:</strong> <span className="font-bold text-blue-700">SAR {hotel.pricePerNight.toLocaleString()} / night</span></p>
                        </div>
                    )}

                    {isHoliday && (
                         <div className="mt-4 text-sm space-y-2 text-gray-700">
                           <p><strong>Destination:</strong> {holiday.destination}</p>
                           <p><strong>Duration:</strong> {holiday.duration}</p>
                           <p><strong>Price:</strong> <span className="font-bold text-blue-700">SAR {holiday.price.toLocaleString()}</span></p>
                        </div>
                    )}
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={onClose}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingConfirmationModal;