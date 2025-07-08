import React, { useState } from 'react';
import Head from 'next/head';
import Input from '@/components/ui/Input';
import Image from 'next/image';
import initial from '../../../public/initial.png';
import ImageUploadComponent from '@/components/ImageUpload';
import {handleRegister} from "../../services/auth";
import { useRouter } from 'next/router';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [curso, setCurso] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ 
    email?: string; 
    senha?: string; 
    nome?: string; 
    departamento?: string; 
    curso?: string;
  }>({});
  const router = useRouter();

  const handleImageSelected = (file: File | null) => {
    setFotoPerfil(file);
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try{
      const response = await handleRegister({nome,email,senha,departamento,curso,fotoPerfil})
      alert(`Usuário cadastrado: ${response}`);
      router.push("/login")
    }catch(error : any){
      alert(`Erro ao realizar o cadastro: ${error}`)
    }
  }
  
  return (
    <>
      <Head>
        <title>Cadastro</title>
      </Head>

      <div className="flex flex-col md:flex-row h-screen w-screen bg-[#EDEDED]">
        
        <div className="relative hidden md:block md:w-1/2 h-full">
          <Image
            src={initial}
            alt="Imagem de fundo de login"
            layout="fill" 
            objectFit="cover" 
          />
        </div>

        <div className="flex flex-col items-center justify-center w-1/2 bg-[#EDEDED] -mt-4">

          <div className="-mb-8 max-w-lg"> 
              <ImageUploadComponent onImageSelected={handleImageSelected} />
          </div>
          
          <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4"> 
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
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              error={errors.senha}
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
          <div className='flex flex-col md:flex-row justify-center gap-y-4 gap-x-[29px] mt-8 w-full max-w-lg'> 
              <button
                type="submit"
                className="bg-[#A4FED3] border-2 border-[#222E50] text-[#222E50] text-2xl w-[223px] h-[73px] rounded-2xl
                            hover:bg-[#86E0B3]"
                disabled={loading}
              >
                {loading ? 'Carregando...' : 'Criar Conta'}
              </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
