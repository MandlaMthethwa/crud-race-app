import { useEffect, useReducer, useState } from 'react';
import RaceForm from './components/RaceForm';
import RaceList from './components/RaceList';
import EditModal from './components/Update';
import Header from './components/Header';
import { Race, racesReducer, State } from './reducer/racesReducer';
import { Analytics } from'@vercel/analytics/react';
const initialState: State = {
  races: []
};

function App() {
  const [state, dispatch] = useReducer(racesReducer, initialState);
  const [showModal, setShowModal] = useState(false);
  const [dataToEdit, setDataToEdit] = useState<Race | undefined>(undefined);

  useEffect(() => {
    if (!showModal) {
      setDataToEdit(undefined);
    }
  }, [showModal]);

  const toggleModal = () => {
    setShowModal((show) => !show);
  };

  const handleEdit = (id: number) => {
    setDataToEdit(state.races.find((race) => race.id === id));
    toggleModal();
  };

  return (
    <div className='App'>
      <Header />
      <div className='main-container'>
        <RaceForm
          dispatch={dispatch}
          dataToEdit={dataToEdit}
          toggleModal={toggleModal}
        />
        <hr />
        {state.races.length > 0 && (
          <RaceList
            races={state.races}
            handleEdit={handleEdit}
            dispatch={dispatch}
          />
        )}
      </div>
      <EditModal
        showModal={showModal}
        dataToEdit={dataToEdit}
        toggleModal={toggleModal}
        dispatch={dispatch}
      />
    </div>
  );
}

export default App;
