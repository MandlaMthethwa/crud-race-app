import { FC } from 'react';
import { Action, Race } from '../reducer/racesReducer';
import RaceItem from './RaceItem';

interface RaceListProps {
  races: Race[];
  handleEdit: (id: number) => void;
  dispatch: React.Dispatch<Action>;
}

const RaceList: FC<RaceListProps> = ({
  races,
  handleEdit,
  dispatch
}) => {
  return (
    <div className='races-list'>
      <h3 className='races-list-title'>List of Races</h3>
      <div className='races-list-table-container'>
        <table className='races-list-table'>
          <thead className='races-list-header'>
            <tr>
              <th>Race Name</th>
              <th>Location</th>
	      <th>Race Details</th>
              <th>Organiser</th>
              <th>Race Date</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {races.map((race) => (
              <RaceItem
                key={race.id}
                {...race}
                handleEdit={handleEdit}
                dispatch={dispatch}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RaceList;
