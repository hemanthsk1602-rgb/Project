// ==============================================================================
// NEXUS — NAVIGATION & TRANSIT PROVIDER ABSTRACTION
// ==============================================================================

export interface PlaceLocation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  placeType: 'campus' | 'library' | 'hostel' | 'station' | 'metro' | 'gym' | 'other';
}

export interface TransitSegment {
  mode: 'walk' | 'bus' | 'metro' | 'auto';
  instruction: string;
  durationMinutes: number;
  distanceMeters: number;
  lineName?: string; // e.g. "Route 204B" or "Blue Line Metro"
  stopName?: string;
}

export interface RouteOption {
  id: string;
  summary: string;
  origin: PlaceLocation;
  destination: PlaceLocation;
  durationMinutes: number;
  distanceKm: number;
  fareEstimate: number;
  travelMode: 'public_transport' | 'walking' | 'auto';
  transfersCount: number;
  segments: TransitSegment[];
  isDemoData: boolean;
  providerNotice: string;
}

export interface MapsProvider {
  name: string;
  isConfigured: boolean;
  searchPlaces(query: string): Promise<PlaceLocation[]>;
  calculateRoute(origin: PlaceLocation, destination: PlaceLocation): Promise<RouteOption[]>;
  getTransitOptions(origin: PlaceLocation, destination: PlaceLocation): Promise<RouteOption[]>;
}

