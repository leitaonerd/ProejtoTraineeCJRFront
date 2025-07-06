import React from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  // Função para garantir que o clique no botão não se propague
  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      onClick={handleCloseClick}
    >
      <div 
        className="relative bg-green-300 rounded-3xl p-6 w-full max-w-2xl mx-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleCloseClick}
          className="absolute top-4 right-4 text-white text-2xl p-1 bg-black bg-opacity-20 rounded-full hover:bg-opacity-30 transition"
          aria-label="Fechar modal"
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