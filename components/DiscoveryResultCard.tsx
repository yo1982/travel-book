import React from 'react';
import { DiscoveryResult } from '../types';

interface DiscoveryResultCardProps {
    result: DiscoveryResult;
    onPlan: (result: DiscoveryResult) => void;
}

export const DiscoveryResultCard: React.FC<DiscoveryResultCardProps> = ({ result, onPlan }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
            <img className="h-56 w-full object-cover" src={result.imageUrl} alt={result.title} />
            <div className="p-6 flex-grow flex flex-col">
                <div className="flex-grow">
                    <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">{result.category}</span>
                    <h3 className="mt-2 text-xl font-bold text-gray-900">{result.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{result.location}</p>
                    <p className="mt-3 text-gray-600 text-base">{result.description}</p>
                </div>
                <div className="mt-4 flex justify-end">
                     <button onClick={() => onPlan(result)} className="bg-orange-500 text-white font-bold py-2 px-6 rounded-full hover:bg-orange-600 transition-colors duration-200">
                        Plan This Trip
                    </button>
                </div>
            </div>
        </div>
    );
};