import React from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalEditarPerfil: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div onClick={(e) => e.stopPropagation()} className="flex items-center justify-center bg-[#EDEDED] rounded-3xl p-6 w-full max-w-2xl mx-4 shadow-lg">
        {children}
      </div>
    </div>,
    document.body
  );
};

export default ModalEditarPerfil;
