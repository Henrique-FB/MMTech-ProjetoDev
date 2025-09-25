export interface Trip {
    id: number;
    stops: Stop[];
}

export interface Stop {
    id: number;
    trip_id: number;
    city: City;
    stop_order: number;
}

export interface City {
    id: number;
    name: string;
    uf: string;
    latitude: number;
    longitude: number;
}
