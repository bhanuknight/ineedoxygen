
export interface Help {
    id: string;
    message: string;
    lastUpdated: string;
    created: string;
    location: Location;
}

export interface Location {
    lat: number;
    lon: number;
}