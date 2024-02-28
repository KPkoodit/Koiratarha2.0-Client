interface Coordinates {
    latitude: number;
    longitude: number;
  }
  
  interface PointOfInterest {
    name_fi: string;
    latitude: number;
    longitude: number;
    street_address_fi: string;
    address_city_fi: string;
  }
  
  export type {Coordinates, PointOfInterest};