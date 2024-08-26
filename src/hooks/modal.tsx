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
      <Modal open={isOpen} onClose={closeModal} disablePortal hideBackdrop>
        <div
          className="flex justify-center items-center w-screen h-screen"
          onClick={closeModal}
        >
          <div
            data-testid="modal-content"
            className="bg-white rounded min-w-80 shadow-inner"
            onClick={(e) => e.stopPropagation()}
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
        </div>
      </Modal>
    );
  };

  return { closeModal, openModal, Modal: ModalItem };
};

export default useModal;
