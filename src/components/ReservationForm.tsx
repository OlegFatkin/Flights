import React, { useState, useEffect } from 'react';
import { ButtonGroup, Button, TextField, Alert } from '@mui/material';
import { ITicket } from "../model";

interface ReservationFormProps {
  ticket: ITicket;
  onFormSubmit: (formData: FormData, selectedSeat: string) => void;
  onClose: () => void;
}

export default function ReservationForm(props: ReservationFormProps) {
  const [selectedSeat, setSelectedSeat] = useState<string>("");
  const [nameErr, setNameErr] = useState(false);
  const [surnameErr, setSurnameErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nameValue = formData.get('name') as string;
    const surnameValue = formData.get('surname') as string;
    const phoneValue = formData.get('phone') as string;

    setNameErr(!isValidString(nameValue));
    setSurnameErr(!isValidString(surnameValue));
    setPhoneErr(!isValidPhoneNumber(phoneValue));

    setSubmitClicked(true);
    
    if (isValidString(nameValue) && isValidString(surnameValue) && isValidPhoneNumber(phoneValue) && selectedSeat) {
      props.onFormSubmit(formData, selectedSeat);
      setSelectedSeat("");
    }
  };

  const handleSeatSelection = (seat: string) => {
    setSelectedSeat(seat);
  };

  useEffect(() => {
    setNameErr(false);
    setSurnameErr(false);
    setPhoneErr(false);
  }, [submitClicked]);

  function isValidString(value: string): boolean {
    const pattern = /^[a-zA-Z\s]+$/;
    return pattern.test(value);
  }

  function isValidPhoneNumber(value: string): boolean {
    const pattern = /^[\d\s\-+]+$/;
    return pattern.test(value);
  }

  return (
    <form onSubmit={handleSubmit}>
      {submitClicked && !selectedSeat && <Alert severity="error">Choose a seat</Alert>}
      <ButtonGroup size="small" >
        {props.ticket.seats.map((seat) => (
          <Button
            name="seat"
            onClick={() => handleSeatSelection(seat.number)}
            variant={selectedSeat === seat.number ? 'contained' : 'outlined'}
            disabled={!seat.available}
            key={seat.id}
          >
            {seat.number}
          </Button>
        ))}
      </ButtonGroup>
      <br />
      <TextField name="name" error={nameErr} required sx={{ marginTop: 2 }} label="Name" />
      <TextField name="surname" error={surnameErr} required sx={{ marginTop: 1 }} label="Surname" />
      <TextField name="phone" error={phoneErr} required sx={{ marginTop: 1 }} label="Phone number" />
      <br />
      <Button type="submit" sx={{ marginTop: 3 }}>Reserve</Button>
      <Button onClick={props.onClose} sx={{ marginTop: 3, marginLeft: 1 }}>Close</Button>
    </form>
  );
}
