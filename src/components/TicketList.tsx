import React, { useState, useContext } from 'react';
import { Ticket } from './Ticket';
import { TicketContext } from '../provider/TicketProvider';
import {Box, Autocomplete, TextField, Container} from '@mui/material';
import {Alerts} from "./Alerts"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';


export function TicketList() {

const {tickets} = useContext(TicketContext);

const [date, setDate] = useState<Dayjs  | null>(null);
const [from, setFrom] = useState<string | null>(null);
const [to, setTo] = useState<string | null>(null);

const handleFrom = (event: React.ChangeEvent<{}>, value: string | null) => {
  setFrom(value);
}

const handleTo = (event: React.ChangeEvent<{}>, value: string | null) => {
  setTo(value);
}

const filteredTickets = tickets.filter(item => {
  if (item.seats.every(seat => !seat.available)) {
    return false;
  }
  if (from && item.from !== from) {
    return false;
  }
  if (to && item.to !== to) {
    return false;
  }
  if (date && dayjs(item.departure).format('YYYY-MM-DD') !== date.format('YYYY-MM-DD') && date?.format('YYYY-MM-DD') !== "Invalid Date") {
    return false;
  }
  return true;
});

const message: string = tickets.length > 0 && filteredTickets.length === 0 ? "Sorry, there are no flights." : ""

  return (
    <div >
       <Container>
        <Alerts/>
       <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <Autocomplete
      value={from}
      options={Array.from(new Set(tickets.map(item => item.from)))}
      sx={{ width: 220 }}
      onChange={handleFrom}
     renderInput={(params) => <TextField {...params} label="From" />}
    />
    <Autocomplete
      value={to}
      onChange={handleTo}
      options={Array.from(new Set(tickets.map(item => item.to)))}
      sx={{ width: 220 }}
      renderInput={(params) => <TextField {...params} label="To" />}
    />
    <LocalizationProvider  dateAdapter={AdapterDayjs}>
      <DatePicker label="Date of departure" minDate={dayjs()} value={date} onChange={(newValue) => setDate(newValue)}/>
    </LocalizationProvider>
      </Box>
      <br/>
     {message}
     {filteredTickets && filteredTickets?.map(ticket => <Ticket ticket={ticket} key={ticket.id}/>)} 
     </Container> 
    </div>
  );
  }

