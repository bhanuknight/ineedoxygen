
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

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    postid: string | null;
}