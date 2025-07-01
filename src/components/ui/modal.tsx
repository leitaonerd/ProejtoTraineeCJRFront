import React from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string; // Optional title
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="relative bg-green-300 rounded-3xl p-6 w-full max-w-2xl mx-4 shadow-lg">
        {/*botao de close se precisar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl p-1 bg-black bg-opacity-20 rounded-full hover:bg-opacity-30 transition"
        >
          &times;
        </button>

        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
