import { useState, useContext } from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';
import { ITicket } from "../model"
import { TicketContext } from '../provider/TicketProvider';
import ReservationForm from './ReservationForm';

interface TicketProps {
  ticket: ITicket
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ReservationModal(props: TicketProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const { onBook } = useContext(TicketContext);

  const handleFormSubmit = (formData: FormData, selectedSeat: string) => {
    const booking = {
      id: props.ticket.id,
      name: formData.get('name') as string,
      surname: formData.get('surname') as string,
      phone: formData.get('phone') as string,
      seat: selectedSeat
    };

    onBook(booking, props.ticket);
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen}>Reserve</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h4">
            {props.ticket.from} - {props.ticket.to}
          </Typography>
          <br/>
          <Typography variant="h6">Choose a seat</Typography>
          <ReservationForm ticket={props.ticket} onFormSubmit={handleFormSubmit} onClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}
