import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Offers from './components/Offers';
import DownloadApp from './components/DownloadApp';
import Footer from './components/Footer';
import { SearchResults } from './components/SearchResults';
import { SearchType, SearchResult, Flight, Hotel, HolidayPackage, DiscoveryResult } from './types';
import BookingConfirmationModal from './components/BookingConfirmationModal';
import HotelDetailsModal from './components/HotelDetailsModal';
import HolidayDetailsModal from './components/HolidayDetailsModal';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const flightSchema = {
  type: Type.OBJECT,
  properties: {
    flights: {
      type: Type.ARRAY,
      description: "A list of available flights.",
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING, description: "Unique flight ID" },
          airline: { type: Type.STRING },
          flightNumber: { type: Type.STRING },
          departure: {
            type: Type.OBJECT,
            properties: { airport: { type: Type.STRING }, time: { type: Type.STRING, description: "HH:MM format" } },
          },
          arrival: {
            type: Type.OBJECT,
            properties: { airport: { type: Type.STRING }, time: { type: Type.STRING, description: "HH:MM format" } },
          },
          duration: { type: Type.STRING },
          price: { type: Type.NUMBER },
        },
      },
    },
  },
};

const hotelSchema = {
    type: Type.OBJECT,
    properties: {
        hotels: {
            type: Type.ARRAY,
            description: "A list of available hotels.",
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING, description: "Unique hotel ID" },
                    name: { type: Type.STRING },
                    rating: { type: Type.NUMBER, description: "Star rating from 1 to 5" },
                    pricePerNight: { type: Type.NUMBER },
                    imageUrl: { type: Type.STRING, description: "URL for an image of the hotel." },
                    amenities: { type: Type.ARRAY, items: { type: Type.STRING } },
                    description: { type: Type.STRING },
                }
            }
        }
    }
};

const holidayPackageSchema = {
    type: Type.OBJECT,
    properties: {
        packages: {
            type: Type.ARRAY,
            description: "A list of available holiday packages.",
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING, description: "Unique package ID" },
                    title: { type: Type.STRING },
                    destination: { type: Type.STRING },
                    duration: { type: Type.STRING },
                    price: { type: Type.NUMBER },
                    imageUrl: { type: Type.STRING, description: "URL for an image of the destination." },
                    description: { type: Type.STRING },
                    includes: { type: Type.ARRAY, items: { type: Type.STRING } },
                    rating: { type: Type.NUMBER, description: "User rating from 1 to 5" },
                }
            }
        }
    }
};

const singleHolidayPackageSchema = holidayPackageSchema.properties.packages.items;


const discoveryResultSchema = {
    type: Type.OBJECT,
    properties: {
        results: {
            type: Type.ARRAY,
            description: "A list of travel ideas or destinations.",
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING, description: "Unique result ID" },
                    title: { type: Type.STRING },
                    location: { type: Type.STRING },
                    description: { type: Type.STRING },
                    imageUrl: { type: Type.STRING, description: "URL for an image of the location." },
                    category: { type: Type.STRING },
                }
            }
        }
    }
};

const itinerarySchema = {
    type: Type.OBJECT,
    properties: {
        itinerary: {
            type: Type.ARRAY,
            description: "A day-by-day itinerary for the trip.",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.STRING, description: "e.g., 'Day 1'" },
                    title: { type: Type.STRING, description: "A catchy title for the day's activities." },
                    description: { type: Type.STRING, description: "A detailed description of the activities for the day." },
                }
            }
        }
    }
};


function App() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchType, setSearchType] = useState<SearchType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [bookingItem, setBookingItem] = useState<Flight | Hotel | HolidayPackage | null>(null);
  const [hotelDetails, setHotelDetails] = useState<Hotel | null>(null);
  const [holidayDetails, setHolidayDetails] = useState<HolidayPackage | null>(null);
  const [itinerary, setItinerary] = useState<{day: string; title: string; description: string}[] | null>(null);
  const [isItineraryLoading, setIsItineraryLoading] = useState(false);

  const handleSearch = async (type: SearchType, params: Record<string, string>) => {
    setSearchResults([]);
    setSearchType(type);
    setIsLoading(true);
    setError(null);
    document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth' });


    let prompt = '';
    let schema: object | undefined;
    let dataKey = '';

    switch (type) {
        case 'flights':
            prompt = `Find flights from ${params.from} to ${params.to} on ${params.departure} for ${params.passengers} passenger(s).`;
            schema = flightSchema;
            dataKey = 'flights';
            break;
        case 'hotels':
            prompt = `Find hotels in ${params.location} from ${params.checkin} to ${params.checkout} for ${params.guests} guest(s).`;
            schema = hotelSchema;
            dataKey = 'hotels';
            break;
        case 'holidays':
            prompt = `Find holiday packages to ${params.destination} for the month of ${params.month}, around ${params.duration} days long.`;
            schema = holidayPackageSchema;
            dataKey = 'packages';
            break;
        case 'discover':
            prompt = `Give me travel ideas about "${params.interest}".`;
            schema = discoveryResultSchema;
            dataKey = 'results';
            break;
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });

        const jsonStr = response.text;
        const data = JSON.parse(jsonStr);

        if (data && data[dataKey]) {
            setSearchResults(data[dataKey]);
        } else {
            setSearchResults([]);
        }
        
    } catch (e) {
        console.error(e);
        setError("Sorry, an error occurred while searching. The model may not have returned the expected format. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };

    const handlePlanDiscoveryTrip = async (discoveryResult: DiscoveryResult) => {
        setIsLoading(true);
        setError(null);
        setSearchResults([]);
        setSearchType(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const prompt = `Based on the travel idea "${discoveryResult.title}" in ${discoveryResult.location}, generate a single, compelling holiday package.
        The package should include a unique ID, a catchy title, destination, a duration of approximately 7 days, a price in SAR, a suitable image URL from a royalty-free source, a brief description, a list of what's included (e.g., 'Round-trip flights', '4-star Hotel Stay', 'Daily Breakfast', 'Airport Transfers'), and a user rating between 4 and 5.
        Ensure the generated package is realistic and appealing.`;

        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: singleHolidayPackageSchema,
                },
            });

            const jsonStr = response.text;
            const newPackage: HolidayPackage = JSON.parse(jsonStr);

            const completePackage: HolidayPackage = {
                id: newPackage.id || `pkg-${Date.now()}`,
                destination: newPackage.destination || discoveryResult.location,
                imageUrl: newPackage.imageUrl || discoveryResult.imageUrl,
                ...newPackage,
            };

            if (completePackage) {
                await handleViewHolidayDetails(completePackage);
            } else {
                setError("Could not generate a trip plan from this discovery. Please try another one.");
            }
        } catch (e) {
            console.error(e);
            setError("Sorry, an error occurred while planning the trip. The model response might be invalid. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

  const handleBookFlight = (flight: Flight) => {
    setBookingItem(flight);
  };

  const handleBookHotel = () => {
    if(hotelDetails) {
        setBookingItem(hotelDetails);
        setHotelDetails(null);
    }
  };
  
  const handleBookHoliday = () => {
    if(holidayDetails) {
        setBookingItem(holidayDetails);
        setHolidayDetails(null);
    }
  }

  const handleViewHotelDetails = (hotel: Hotel) => {
    setHotelDetails(hotel);
  };
  
  const handleViewHolidayDetails = async (pkg: HolidayPackage) => {
    setHolidayDetails(pkg);
    setIsItineraryLoading(true);
    setItinerary(null);
    try {
        const prompt = `Generate a detailed day-by-day itinerary for the following holiday package: Title: ${pkg.title}, Destination: ${pkg.destination}, Duration: ${pkg.duration}. The itinerary should be engaging, descriptive, and well-structured.`;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: itinerarySchema,
            },
        });
        const jsonStr = response.text;
        const data = JSON.parse(jsonStr);
        if (data && data.itinerary) {
            setItinerary(data.itinerary);
        }
    } catch (e) {
        console.error("Failed to fetch itinerary:", e);
        // You could set an error state for the itinerary here
    } finally {
        setIsItineraryLoading(false);
    }
  };

  const handleCloseModals = () => {
    setBookingItem(null);
    setHotelDetails(null);
    setHolidayDetails(null);
    setItinerary(null);
  };


  return (
    <div className="bg-gray-50">
      <Header />
      <main>
        <Hero onSearch={handleSearch} isLoading={isLoading} />
        { (searchType || isLoading || error) && 
            <SearchResults 
                results={searchResults} 
                searchType={searchType}
                isLoading={isLoading} 
                error={error}
                onBookFlight={handleBookFlight}
                onViewHotelDetails={handleViewHotelDetails}
                onViewHolidayDetails={handleViewHolidayDetails}
                onPlanDiscoveryTrip={handlePlanDiscoveryTrip}
            /> 
        }
        <Offers />
        <Features />
        <DownloadApp />
      </main>
      <Footer />

      {/* Modals */}
      {bookingItem && (
        <BookingConfirmationModal 
            flight={'flightNumber' in bookingItem ? bookingItem as Flight : undefined}
            hotel={'pricePerNight' in bookingItem ? bookingItem as Hotel : undefined}
            holiday={'includes' in bookingItem ? bookingItem as HolidayPackage : undefined}
            onClose={handleCloseModals} 
        />
      )}
      {hotelDetails && (
        <HotelDetailsModal
            hotel={hotelDetails}
            onClose={handleCloseModals}
            onBook={handleBookHotel}
        />
      )}
       {holidayDetails && (
        <HolidayDetailsModal
            pkg={holidayDetails}
            itinerary={itinerary}
            isItineraryLoading={isItineraryLoading}
            onClose={handleCloseModals}
            onBook={handleBookHoliday}
        />
      )}
    </div>
  );
}

export default App;