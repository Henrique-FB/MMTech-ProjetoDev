
export interface TripHeader {
    id: number;
    name: string;
}

export interface Trip {
  id: number;
  name: string;
  stops: Stop[];
}

export interface Stop {
    id: number;
    city: City;
    position: number;
}

export interface City {
    id: number;
    name: string;
    uf: string;
    latitude: number;
    longitude: number;
}


