import { MapsProvider, PlaceLocation, RouteOption } from './types';

export class DemoMapsProvider implements MapsProvider {
  name = 'Demo Campus Transit Provider';
  isConfigured = false;

  private samplePlaces: PlaceLocation[] = [
    {
      id: 'place-campus-main',
      name: 'Main Academic Block (NIT)',
      address: 'Central Campus Road, Block A',
      latitude: 12.9716,
      longitude: 77.5946,
      placeType: 'campus',
    },
    {
      id: 'place-library',
      name: 'Central University Library',
      address: 'North Wing, Near Clock Tower',
      latitude: 12.9725,
      longitude: 77.596,
      placeType: 'library',
    },
    {
      id: 'place-hostel',
      name: 'Ramanujan Student Hostel',
      address: 'South Campus Residential Complex',
      latitude: 12.968,
      longitude: 77.591,
      placeType: 'hostel',
    },
    {
      id: 'place-metro',
      name: 'City Center Metro Station',
      address: 'MG Road Junction',
      latitude: 12.975,
      longitude: 77.605,
      placeType: 'metro',
    },
  ];

  async searchPlaces(query: string): Promise<PlaceLocation[]> {
    const q = query.toLowerCase();
    return this.samplePlaces.filter(
      (p) => p.name.toLowerCase().includes(q) || p.address.toLowerCase().includes(q)
    );
  }

  async calculateRoute(origin: PlaceLocation, destination: PlaceLocation): Promise<RouteOption[]> {
    return this.getTransitOptions(origin, destination);
  }

  async getTransitOptions(origin: PlaceLocation, destination: PlaceLocation): Promise<RouteOption[]> {
    const notice = 'Live navigation isn\'t configured yet. Demo routes are available for development.';

    return [
      {
        id: 'demo-route-metro',
        summary: 'Campus Shuttle + Purple Line Metro',
        origin,
        destination,
        durationMinutes: 28,
        distanceKm: 7.2,
        fareEstimate: 35,
        travelMode: 'public_transport',
        transfersCount: 1,
        isDemoData: true,
        providerNotice: notice,
        segments: [
          {
            mode: 'walk',
            instruction: 'Walk to North Campus Gate Shuttle Stop',
            durationMinutes: 4,
            distanceMeters: 300,
          },
          {
            mode: 'bus',
            instruction: 'Take University Shuttle Route S1 towards City Metro',
            durationMinutes: 10,
            distanceMeters: 3200,
            lineName: 'Shuttle S1',
            stopName: 'North Gate',
          },
          {
            mode: 'metro',
            instruction: 'Board Purple Line Metro towards MG Road',
            durationMinutes: 12,
            distanceMeters: 3700,
            lineName: 'Purple Line (Platform 2)',
            stopName: 'Tech Park Station',
          },
          {
            mode: 'walk',
            instruction: 'Walk 200m to destination entrance',
            durationMinutes: 2,
            distanceMeters: 200,
          },
        ],
      },
      {
        id: 'demo-route-bus',
        summary: 'Direct City Bus 335E',
        origin,
        destination,
        durationMinutes: 42,
        distanceKm: 8.5,
        fareEstimate: 20,
        travelMode: 'public_transport',
        transfersCount: 0,
        isDemoData: true,
        providerNotice: notice,
        segments: [
          {
            mode: 'walk',
            instruction: 'Walk to Main Highway Bus Stand',
            durationMinutes: 7,
            distanceMeters: 550,
          },
          {
            mode: 'bus',
            instruction: 'Board BMTC Bus 335E',
            durationMinutes: 32,
            distanceMeters: 7800,
            lineName: 'BMTC 335E',
            stopName: 'College Circle',
          },
          {
            mode: 'walk',
            instruction: 'Arrive at destination',
            durationMinutes: 3,
            distanceMeters: 150,
          },
        ],
      },
    ];
  }
}

