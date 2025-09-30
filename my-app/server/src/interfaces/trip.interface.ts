export interface Trip {
    id: number;
    name: string;
    stops: Stop[];
    full_duration: number[];
    full_distance: number[];
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
