import React from 'react';


interface ModalConfirmarProps {
  isOpen: boolean;                      // Controla se o modal está visível
  onClose: () => void;                  // Função para ser chamada ao fechar
  onConfirm: () => void;                // Função para ser chamada ao confirmar
  title: string;                        // O título do modal
  children: React.ReactNode;            // O conteúdo/mensagem do modal
}

const ModalConfirmar: React.FC<ModalConfirmarProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  children 
}) => {
  if (!isOpen) {
    return null;
  }

  return (

    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center"
        onClick={(e) => e.stopPropagation()} 
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="mb-6">{children}</div>
        <div className="flex justify-center gap-4">
          <button 
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Cancelar
          </button>
          <button 
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmar;