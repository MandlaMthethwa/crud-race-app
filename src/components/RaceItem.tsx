import { FC } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Action, Race } from '../reducer/racesReducer';

interface ExtraProps {
  handleEdit: (id: number) => void;
  dispatch: React.Dispatch<Action>;
}

const RaceItem: FC<Race & ExtraProps> = ({
  id,
  raceName,
  raceDetails,
  raceLocation,
  raceDate,
  organiser,

  handleEdit,
  dispatch
}) => {
  return (
    <tr>
      <td>{raceName}</td>
      <td>{raceLocation}</td>
      <td>{raceDetails}</td>
      <td>{organiser}</td>
      <td>{raceDate}</td>

      <td>
        <AiFillEdit size={20} onClick={() => handleEdit(id)} className='icon' />
      </td>
      <td>
        <AiFillDelete
          size={20}
          onClick={() => {
            const confirmDelete = window.confirm(
              `Are you sure you want to delete ${raceName}?`
            );
            if (confirmDelete) {
              dispatch({
                type: 'DELETE_RACE',
                payload: { id }
              });
            }
          }}
          className='icon'
        />
      </td>
    </tr>
  );
};

export default RaceItem;
