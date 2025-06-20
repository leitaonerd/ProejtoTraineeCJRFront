// components/feed/NovaPublicacaoModal.tsx
import React from 'react';

interface NovaPublicacaoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NovaPublicacaoModal: React.FC<NovaPublicacaoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', width: '500px' }}>
        <h2>Nova Publicação</h2>
        <select className="w-full mb-2 px-3 py-2 rounded border">
          <option>Nome do professor</option>
        </select>
        <select className="w-full mb-2 px-3 py-2 rounded border">
          <option>Disciplina</option>
        </select>
        <textarea
          rows={5}
          placeholder="Escreva sua avaliação..."
          className="w-full mb-4 px-3 py-2 rounded border"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-red-600 hover:underline">Cancelar</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded">Avaliar</button>
        </div>
      </div>
    </div>
  );
};

export default NovaPublicacaoModal;
