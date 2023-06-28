import { useContext } from 'react';
import { TicketContext } from '../provider/TicketProvider';
import { Alert, AlertTitle } from '@mui/material';
import dayjs from 'dayjs';


export function Alerts() {

const {ticketInfo, error} = useContext(TicketContext);


  return (
    <div >
        {ticketInfo.state === "success" &&
         <Alert>
          <AlertTitle><strong>Reservation completed successfully.</strong></AlertTitle>
          <strong>Flight details</strong><br/>
          Departure <strong>{ticketInfo?.ticket?.from} {dayjs(ticketInfo.ticket?.departure).format('MM/DD/YY HH:MM')}<br/></strong>
          Arrival <strong>{ticketInfo?.ticket?.to} {dayjs(ticketInfo.ticket?.departure).format('MM/DD/YY HH:MM')}<br/></strong>
          Seat  <strong>{ticketInfo?.seat}<br/></strong>
          Price <strong>{ticketInfo?.ticket?.price}$<br/></strong>
        </Alert>
        }
        {error &&
         <Alert severity="error">
          <AlertTitle><strong>Error loading tickets.</strong></AlertTitle>
           We are using mockup data from <strong>src/data/data.json</strong> file.
        </Alert>
        }
    </div>
  );
  }

