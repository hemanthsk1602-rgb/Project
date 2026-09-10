import { MapsProvider, PlaceLocation, RouteOption } from './providers/maps/types';
import { DemoMapsProvider } from './providers/maps/DemoMapsProvider';

class NavigationService {
  private provider: MapsProvider;

  constructor() {
    const providerType = process.env.MAPS_PROVIDER;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

    if (providerType === 'google' && apiKey) {
      // Future phase: initialize GoogleMapsProvider
      this.provider = new DemoMapsProvider();
    } else {
      this.provider = new DemoMapsProvider();
    }
  }

  getProviderName(): string {
    return this.provider.name;
  }

  isLive(): boolean {
    return this.provider.isConfigured;
  }

  async searchPlaces(query: string): Promise<PlaceLocation[]> {
    return this.provider.searchPlaces(query);
  }

  async getTransitOptions(origin: PlaceLocation, destination: PlaceLocation): Promise<RouteOption[]> {
    return this.provider.getTransitOptions(origin, destination);
  }
}

export const navigationService = new NavigationService();

