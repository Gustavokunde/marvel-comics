import CloseIcon from '@mui/icons-material/Close';
import { Modal } from '@mui/material';
import React from 'react';
interface Props {
  children: React.ReactElement<HTMLElement>;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}
const DefaultModal = ({ children, title, isOpen, onClose }: Props) => {
  return (
    <div className="flex  absolute justify-center items-center h-screen w-screen">
      <Modal open={isOpen} onClose={onClose} disablePortal>
        <div
          className="flex justify-center items-center w-screen h-screen "
          onClick={onClose}
        >
          <div
            data-testid="modal-content"
            className="bg-white rounded min-w-80 shadow-inner "
            onClick={(e) => e.stopPropagation()}
          >
            <section className="flex justify-between px-2 pt-2">
              <h1 className="text-xl mb-2">{title}</h1>
              <CloseIcon
                role="button"
                data-testid="close-icon"
                onClick={onClose}
              />
            </section>
            <div className="max-h-[90vh] overflow-y-auto">{children}</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DefaultModal;
