'use client'; 

import React, { useState } from 'react';
import ProfileEditForm from './ProfileEditForm'; 
import ModalEditarPerfil from '../ui/modalEditarPerfil';

export default function EditarPerfil() {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex justify-center items-center"> 
      <button
        onClick={openModal}
        className="bg-[#a4fed3] hover:bg-[#88e7bb] text-stone-950 font-bold py-2 px-4 border-b-4 border-[#72c8a1] hover:border-[#5ea88a] rounded w-32 h-11 transition-all duration-200 ease-in-out"
      >
        Editar Perfil
      </button>

      <ModalEditarPerfil
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <ProfileEditForm onClose={closeModal}/>
      </ModalEditarPerfil>
    </div>
  );
}