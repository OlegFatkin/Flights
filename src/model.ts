interface Places {
    id: number, number: string, available: boolean 
}

export interface ITicket {
    id: number,
    from: string,
    to: string,
    departure: string,
    arrival: string,
    duration: string,
    price: number,
    seats: Places[]
}