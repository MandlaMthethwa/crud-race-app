import { FC, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Action, Race } from '../reducer/racesReducer';

interface RaceFormProps {
  dispatch: React.Dispatch<Action>;
  dataToEdit: Race | undefined;
  toggleModal: () => void;
}

const RaceForm: FC<RaceFormProps> = ({
  dispatch,
  dataToEdit,
  toggleModal
}) => {
  const [race, setRace] = useState({
    raceName: dataToEdit?.raceName ? dataToEdit.raceName : '',
    raceLocation: dataToEdit?.raceLocation ? dataToEdit.raceLocation : '',
    raceDetails: dataToEdit?.raceDetails ? dataToEdit.raceDetails: '',
    organiser: dataToEdit?.organiser ? dataToEdit.organiser : '',
    raceDate: dataToEdit?.raceDate ? dataToEdit.raceDate : ''
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setRace((prevState) => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { raceName, raceLocation,raceDetails, raceDate ,organiser} = race;

    if (
      raceName.trim() === '' ||
      raceLocation.trim() === '' ||
      raceDetails.trim() === '' ||
      organiser.trim() === ''||
      raceDate.trim() === ''
    ) {
      setErrorMsg('All the fields are required.');
      return;
    } //else if (!phone.trim().match(/^\d{10}$/g)) {
    //   setErrorMsg('Please enter a valid 10 digit phone number.');
    //   return;
    // }

    if (!dataToEdit) {
      dispatch({
        type: 'ADD_RACE',
        payload: {
          id: Date.now(), // returns current timestamp
          ...race
        }
      });
      setRace({
        raceName: '',
        raceLocation: '',
        raceDetails:'',
        organiser:'',
        raceDate: ''
      });
      setErrorMsg('');
    } else {
      dispatch({
        type: 'UPDATE_RACE',
        payload: {
          id: dataToEdit.id,
          updates: {
            id: Date.now(),
            ...race
          }
        }
      });
      toggleModal();
    }
  };

  return (
    <Form onSubmit={handleOnSubmit} className='race-form'>
      {errorMsg && <p className='errorMsg'>{errorMsg}</p>}
      <Form.Group controlId='raceName'>
        <Form.Label>Race Name</Form.Label>
        <Form.Control
          className='raceName'
          name='raceName'
          value={race.raceName}
          type='text'
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group controlId='raceLocation'>
        <Form.Label>Location</Form.Label>
        <Form.Control
          className='raceLocation'
          name='raceLocation'
          value={race.raceLocation}
          type='text'
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group controlId='raceDetails'>
        <Form.Label>Race Details</Form.Label>
        <Form.Control
          className='raceDetails'
          name='raceDetails'
          value={race.raceDetails}
          type='text'
          onChange={handleOnChange}
        />
      </Form.Group>
    
      <Form.Group controlId='organiser'>
        <Form.Label>Organiser</Form.Label>
        <Form.Control
          className='organiser'
          name='organiser'
          value={race.organiser}
          type='text'
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group controlId='raceDate'>
        <Form.Label>Race Date</Form.Label>
        <Form.Control
          className='raceDate'
          name='raceDate'
          value={race.raceDate}
          type='date'
          onChange={handleOnChange}
        />
      </Form.Group>


      <Form.Group controlId='submit'>
        <Button variant='primary' type='submit' className='submit-btn'>
          {dataToEdit ? 'Update Race' : 'Add Race'}
        </Button>
      </Form.Group>
    </Form>
  );
};

export default RaceForm;