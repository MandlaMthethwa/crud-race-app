import { FC } from 'react';
import { Modal } from 'react-bootstrap';
import { Action, Race } from '../reducer/racesReducer';
import RaceForm from './RaceForm';

interface EditModalProps {
  showModal: boolean;
  dataToEdit: Race | undefined;
  toggleModal: () => void;
  dispatch: React.Dispatch<Action>;
}

const EditModal: FC<EditModalProps> = ({
  toggleModal,
  dataToEdit,
  showModal,
  dispatch
}) => {
  return (
    <Modal show={showModal} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Update Race</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RaceForm
          dispatch={dispatch}
          dataToEdit={dataToEdit}
          toggleModal={toggleModal}
        />
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
