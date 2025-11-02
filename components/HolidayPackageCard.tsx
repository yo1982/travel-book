import React from 'react';
import { HolidayPackage } from '../types';
import { StarIcon } from './icons/StarIcon';

interface HolidayPackageCardProps {
    pkg: HolidayPackage;
    onViewDetails: (pkg: HolidayPackage) => void;
}

export const HolidayPackageCard: React.FC<HolidayPackageCardProps> = ({ pkg, onViewDetails }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img className="h-56 w-full object-cover" src={pkg.imageUrl} alt={pkg.title} />
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{pkg.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{pkg.destination} &bull; {pkg.duration}</p>
                <div className="flex items-center mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon key={i} className={`h-5 w-5 ${i < pkg.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-500">Starting from</p>
                        <p className="text-2xl font-bold text-blue-600">SAR {pkg.price.toLocaleString()}</p>
                    </div>
                    <button onClick={() => onViewDetails(pkg)} className="bg-orange-500 text-white font-bold py-2 px-6 rounded-full hover:bg-orange-600 transition-colors duration-200">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};
