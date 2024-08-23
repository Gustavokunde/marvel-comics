import CloseIcon from '@mui/icons-material/Close';
import { Modal } from '@mui/material';
import React, { useState } from 'react';

interface Props {
  internalContent: React.ReactElement<HTMLElement>;
}
const useModal = ({ internalContent }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const ModalItem = () => {
    return (
      <Modal open={isOpen} onClose={closeModal}>
        <div
          className="bg-white rounded min-w-80 
        absolute top-1/2 left-1/2 shadow-inner -translate-x-1/2 -translate-y-1/2 "
        >
          <section className="flex justify-end pr-2 pt-2">
            <CloseIcon
              role="button"
              data-testid="close-icon"
              onClick={closeModal}
            />
          </section>
          {internalContent}
        </div>
      </Modal>
    );
  };

  return { closeModal, openModal, Modal: ModalItem };
};

export default useModal;
