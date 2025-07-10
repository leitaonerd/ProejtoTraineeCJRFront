'use client'; 
import React, { useEffect, useState } from 'react';
import ImageUploadComponent from '../ImageUpload';
import Input from '../ui/Input';
import { UpdateUser, User } from '@/types/user';
import api from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { updateUsers } from '@/services/ApiUsuario';

interface ProfileEditFormProps {
  onClose: () => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({onClose}) => {
  const { user : loggedInUser, updateUser } = useAuth();
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [curso, setCurso] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    nome?: string;
    departamento?: string;
    curso?: string;
    currentPassword?: string;
    newPassword?: string;    
    confirmNewPassword?: string;
  }>({});

  const handleImageSelected = (file: File | null) => {
    setFotoPerfil(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    let formErrors: { [key: string]: string } = {};

     if (newPassword) {
        if (!currentPassword) {
            formErrors.currentPassword = 'Por favor, informe sua senha atual.';
        }
        if (!confirmNewPassword) {
            formErrors.confirmNewPassword = 'Por favor, confirme a nova senha.';
        }
        if (newPassword !== confirmNewPassword) {
            formErrors.confirmNewPassword = 'As novas senhas não coincidem.';
        }
    }
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setLoading(false);
      return;
    }

    const formData = new FormData();

    if (nome) formData.append('nome', nome);
    if (email) formData.append('email', email);
    if (curso) formData.append('curso', curso);
    if (newPassword) formData.append('senha',newPassword)
    if (departamento) formData.append('departamento', departamento);
    if (fotoPerfil) formData.append('fotoPerfil', fotoPerfil);

    try {
      const userId = loggedInUser?.id;
      if (!userId) {
        throw new Error("ID do usuário não encontrado. Faça o login novamente.");
      }
      const response = await updateUsers(formData,userId)
      const updatedUser = response.data; 
      updateUser(updatedUser)
      
      alert('Perfil atualizado com sucesso!');
      onClose();
    } catch (error: any) {
      console.error("Erro ao atualizar perfil:", error);
      const errorMsg = error.response?.data?.message || 'Falha ao atualizar o perfil. Tente novamente.';
      setErrors({ email: errorMsg }); 
      if(error.status == 401){alert("email ou senha incorretos");}
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-1/2 bg-[#EDEDED] -mt-4">

      <div className="-mb-8 max-w-lg"> 
        <ImageUploadComponent onImageSelected={handleImageSelected} />
      </div>
      
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4"> 
        <Input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          error={errors.nome}
          disabled={loading}
          className='flex items-center justify-start rounded-xl'
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          disabled={loading}
          className='flex items-center justify-start rounded-xl'
        />
        <Input
          type="text"
          placeholder="Curso"
          value={curso}
          onChange={(e) => setCurso(e.target.value)}
          error={errors.curso}
          disabled={loading}
          className='flex items-center justify-start rounded-xl'
        />
        <Input
          type="text"
          placeholder="Departamento"
          value={departamento}
          onChange={(e) => setDepartamento(e.target.value)}
          error={errors.departamento}
          disabled={loading}
          className='flex items-center justify-start rounded-xl'
        />
        <Input
          type="password"
          placeholder="Senha atual"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          error={errors.currentPassword}
          disabled={loading}
          className='rounded-xl'
        />
        <Input
          type="password"
          placeholder="Nova senha"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={errors.newPassword}
          disabled={loading}
          className='rounded-xl'
        />
        <Input
          type="password"
          placeholder="Confirmar nova senha"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          error={errors.confirmNewPassword}
          disabled={loading}
          className='rounded-xl'
        />
        <div className='flex flex-col md:flex-row justify-center gap-y-4 gap-x-[29px] mt-8 w-full max-w-lg'> 
          <button
            type="submit"
            className="bg-[#A4FED3] border-2 border-[#222E50] text-[#222E50] text-2xl w-[223px] h-[73px] rounded-2xl
                        hover:bg-[#86E0B3]"
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>          
  );
};

export default ProfileEditForm;