import React, { useState } from 'react';
import { SearchType } from '../types';
import { PlaneIcon } from './icons/PlaneIcon';
import { BedIcon } from './icons/BedIcon';
import { PalmTreeIcon } from './icons/PalmTreeIcon';
import { GlobeIcon } from './icons/GlobeIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { UserIcon } from './icons/UserIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface BookingFormProps {
  onSearch: (type: SearchType, params: Record<string, string>) => void;
  isLoading: boolean;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSearch, isLoading }) => {
  const [activeTab, setActiveTab] = useState<SearchType>('flights');
  
  const [flightParams, setFlightParams] = useState({ from: 'Riyadh', to: 'Jeddah', departure: '2024-08-15', passengers: '1' });
  const [hotelParams, setHotelParams] = useState({ location: 'Dubai', checkin: '2024-09-10', checkout: '2024-09-15', guests: '2' });
  const [holidayParams, setHolidayParams] = useState({ destination: 'Maldives', month: 'October', duration: '7' });
  const [discoverParams, setDiscoverParams] = useState({ interest: 'historical sites in Europe' });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    switch (activeTab) {
      case 'flights':
        onSearch('flights', flightParams);
        break;
      case 'hotels':
        onSearch('hotels', hotelParams);
        break;
      case 'holidays':
        onSearch('holidays', holidayParams);
        break;
      case 'discover':
        onSearch('discover', discoverParams);
        break;
    }
  };

  const tabs = [
    { id: 'flights' as SearchType, label: 'Flights', icon: <PlaneIcon /> },
    { id: 'hotels' as SearchType, label: 'Hotels', icon: <BedIcon /> },
    { id: 'holidays' as SearchType, label: 'Holidays', icon: <PalmTreeIcon /> },
    { id: 'discover' as SearchType, label: 'Discover', icon: <GlobeIcon /> },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 w-full max-w-4xl">
      <div className="flex border-b mb-4 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 flex items-center space-x-2 px-4 py-3 font-semibold text-sm md:text-base transition-colors duration-200 ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {React.cloneElement(tab.icon, { className: 'h-5 w-5' })}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSearch}>
        {activeTab === 'flights' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <InputField label="From" value={flightParams.from} onChange={e => setFlightParams({...flightParams, from: e.target.value})} />
            <InputField label="To" value={flightParams.to} onChange={e => setFlightParams({...flightParams, to: e.target.value})} />
            <InputField label="Departure" type="date" value={flightParams.departure} onChange={e => setFlightParams({...flightParams, departure: e.target.value})} icon={<CalendarIcon className="h-5 w-5 text-gray-400" />} />
            <InputField label="Passengers" type="number" min="1" value={flightParams.passengers} onChange={e => setFlightParams({...flightParams, passengers: e.target.value})} icon={<UserIcon className="h-5 w-5 text-gray-400" />} />
          </div>
        )}
        {activeTab === 'hotels' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
             <InputField label="Location" value={hotelParams.location} onChange={e => setHotelParams({...hotelParams, location: e.target.value})} />
             <InputField label="Check-in" type="date" value={hotelParams.checkin} onChange={e => setHotelParams({...hotelParams, checkin: e.target.value})} icon={<CalendarIcon className="h-5 w-5 text-gray-400" />} />
             <InputField label="Check-out" type="date" value={hotelParams.checkout} onChange={e => setHotelParams({...hotelParams, checkout: e.target.value})} icon={<CalendarIcon className="h-5 w-5 text-gray-400" />} />
             <InputField label="Guests" type="number" min="1" value={hotelParams.guests} onChange={e => setHotelParams({...hotelParams, guests: e.target.value})} icon={<UserIcon className="h-5 w-5 text-gray-400" />} />
          </div>
        )}
        {activeTab === 'holidays' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
             <InputField label="Destination" value={holidayParams.destination} onChange={e => setHolidayParams({...holidayParams, destination: e.target.value})} />
             <InputField label="Month" value={holidayParams.month} onChange={e => setHolidayParams({...holidayParams, month: e.target.value})} />
             <InputField label="Duration (days)" type="number" min="1" value={holidayParams.duration} onChange={e => setHolidayParams({...holidayParams, duration: e.target.value})} />
          </div>
        )}
        {activeTab === 'discover' && (
           <div className="grid grid-cols-1 gap-4 items-end">
              <InputField label="What are you interested in?" value={discoverParams.interest} onChange={e => setDiscoverParams({interest: e.target.value})} placeholder="e.g., beach vacation in Thailand" />
           </div>
        )}

        <div className="mt-6 flex justify-center">
            <button type="submit" disabled={isLoading} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-10 rounded-full transition-colors duration-200 flex items-center justify-center disabled:bg-orange-300 w-full md:w-auto">
                {isLoading ? <SpinnerIcon className="h-5 w-5 mr-2" /> : null}
                {isLoading ? 'Searching...' : 'Search'}
            </button>
        </div>
      </form>
    </div>
  );
};

const InputField: React.FC<{label: string, value: string | number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type?: string, icon?: React.ReactNode, placeholder?: string, min?: string}> = 
({ label, value, onChange, type = 'text', icon, placeholder, min }) => (
    <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="mt-1 relative">
            {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                min={min}
                className={`block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${icon ? 'pl-10' : 'px-3'}`}
            />
        </div>
    </div>
);


export default BookingForm;
