import React from 'react';
import { SearchResult, SearchType, Flight, Hotel, HolidayPackage, DiscoveryResult } from '../types';
import { FlightCard } from './FlightCard';
import { HotelCard } from './HotelCard';
import { HolidayPackageCard } from './HolidayPackageCard';
import { DiscoveryResultCard } from './DiscoveryResultCard';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface SearchResultsProps {
    results: SearchResult[];
    searchType: SearchType | null;
    isLoading: boolean;
    error: string | null;
    onBookFlight: (flight: Flight) => void;
    onViewHotelDetails: (hotel: Hotel) => void;
    onViewHolidayDetails: (pkg: HolidayPackage) => void;
    onPlanDiscoveryTrip: (result: DiscoveryResult) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ 
    results, 
    searchType, 
    isLoading, 
    error,
    onBookFlight,
    onViewHotelDetails,
    onViewHolidayDetails,
    onPlanDiscoveryTrip
}) => {
    if (isLoading) {
        return (
            <div id="search-results" className="flex justify-center items-center py-20">
                <SpinnerIcon className="h-12 w-12 text-blue-600" />
                <p className="ml-4 text-lg text-gray-600">Finding the best deals for you...</p>
            </div>
        );
    }

    if (error) {
        return <div id="search-results" className="text-center py-20 text-red-600 bg-red-50 rounded-lg max-w-3xl mx-auto p-4 border border-red-200">
          <h3 className="font-bold text-lg">Oops! Something went wrong.</h3>
          <p className="mt-2 text-sm">{error}</p>
        </div>;
    }
    
    if (!searchType && results.length === 0) {
        return null;
    }
    
    if (results.length === 0) {
        return (
             <div id="search-results" className="text-center py-20 text-gray-500">
                <h3 className="font-bold text-lg">No results found.</h3>
                <p className="mt-2">Try adjusting your search criteria.</p>
            </div>
        )
    }

    const renderResult = (result: SearchResult, index: number) => {
        switch (searchType) {
            case 'flights':
                return <FlightCard key={(result as Flight).id || index} flight={result as Flight} onBook={onBookFlight} />;
            case 'hotels':
                return <HotelCard key={(result as Hotel).id || index} hotel={result as Hotel} onViewDetails={onViewHotelDetails} />;
            case 'holidays':
                return <HolidayPackageCard key={(result as HolidayPackage).id || index} pkg={result as HolidayPackage} onViewDetails={onViewHolidayDetails} />;
            case 'discover':
                return <DiscoveryResultCard key={(result as DiscoveryResult).id || index} result={result as DiscoveryResult} onPlan={onPlanDiscoveryTrip} />;
            default:
                return null;
        }
    };
    
    return (
        <div id="search-results" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 capitalize">{searchType} Results</h2>
            <div className="space-y-6">
                {results.map(renderResult)}
            </div>
        </div>
    );
};