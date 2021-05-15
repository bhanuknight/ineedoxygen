
export interface Help {
    id: string,
    title: string,
    message: string,
    lastUpdated: string,
    created: string,
    location: Location,
    comments?: Array<Comments>
}

export interface Location {
    lat: number,
    lon: number
}

export interface Comments {
    user: string,
    name: string,
    comment: string,
    created?: string
}

export interface User {
    id: string,
    name: string,
    email: string,
    password: string,
    phone?: string,
    postid: string | null
}