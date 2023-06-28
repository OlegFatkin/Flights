import { ITicket } from "../model";
import {Typography, Card, CardActions, CardContent} from '@mui/material';
import dayjs from 'dayjs';
import ReservationModal from "./ReservationModal";

interface TicketProps{
    ticket: ITicket
}

export function Ticket(props: TicketProps){

  let departure = dayjs(props.ticket.departure).format('MM/DD/YY HH:MM')
  let arrival = dayjs(props.ticket.arrival).format('MM/DD/YY HH:MM')
  
    return(
      <>
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
           {props.ticket.from} - {props.ticket.to}
        </Typography>
        <Typography  color="text.secondary">
        Departure {departure}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Arrival {arrival}
        </Typography>
        <Typography variant="h5">
        {props.ticket.price}$
        </Typography>
      </CardContent>
      <CardActions>
        <ReservationModal ticket={props.ticket}/>
      </CardActions>
    </Card>
    <br />
    </>
    )
}