
import React, { useEffect, useState } from 'react';
import { ITicket } from "../model";
import axios from 'axios';
import Data from "../data/data.json"

interface IBook {
  id: number,
  name: string,
  surname: string,
  phone: string,
  seat: string,
}

interface Places {
  id: number, number: string, available: boolean 
}

interface Info {
  seat: string,
  ticket: ITicket,
  state: string, 
}

interface ITickets{
  tickets: ITicket[]
  onBook: (booking: IBook, ticket: ITicket) => void,
  ticketInfo: Info,
  error: boolean
}


export const TicketContext = React.createContext<ITickets>({
  tickets: [],
  onBook: () => {},
  ticketInfo: {} as Info,
  error: false
})

export const TicketProvider = ({ children }:{ children: React.ReactNode }) => {

  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [ticketInfo, setTicketInfo] = useState<Info>({} as Info);

  async function fetchTickets() {
    try {
      const response = await axios.get<ITicket[]>("https://pastebin.com/raw/455b7hAF");
      setTickets(response.data);
  } catch (error) {
      setTickets(Data);
      console.error('Error fetching tickets:', error);
      setError(true)
  }
  }

    function onBook(booking: IBook, ticket: ITicket){
    const seats: Places[] = ticket.seats.map(seat => {
      if (seat.number === booking.seat) {
        return { ...seat, available: false };
      }
      return seat;
    });
    const newData: ITicket = {...ticket, seats: seats}
    const info: Info = {seat: booking.seat, ticket: newData, state: "success"}
    setTickets(prev => prev.map(item => (item.id === newData.id ? newData : item)))
    setTicketInfo(info)
    setTimeout(() => setTicketInfo({} as Info), 10000)
  }

  useEffect(() => {
    fetchTickets();
  }, []);


  return (
    <TicketContext.Provider value={{tickets, onBook, ticketInfo, error}}>
      {children}
    </TicketContext.Provider>
  );
};

export default TicketProvider


