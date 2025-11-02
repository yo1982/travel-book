export type SearchType = 'flights' | 'hotels' | 'holidays' | 'discover';

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    airport: string;
    time: string;
  };
  arrival: {
    airport: string;
    time: string;
  };
  duration: string;
  price: number;
}

export interface Hotel {
  id: string;
  name: string;
  rating: number;
  pricePerNight: number;
  imageUrl: string;
  amenities: string[];
  description: string;
}

export interface HolidayPackage {
  id: string;
  title: string;
  destination: string;
  duration: string; // e.g., "7 Days / 6 Nights"
  price: number;
  imageUrl: string;
  description: string;
  includes: string[];
  rating: number;
}

export interface DiscoveryResult {
  id: string;
  title: string;
  location: string;
  description: string;
  imageUrl: string;
  category: string; // e.g., "Adventure", "Relaxation", "Cultural"
}

export type SearchResult = Flight | Hotel | HolidayPackage | DiscoveryResult;
