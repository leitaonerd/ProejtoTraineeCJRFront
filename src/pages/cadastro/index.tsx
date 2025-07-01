import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { HeadMetaType } from '@/types/headMetaType';
import Input from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import Image from 'next/image';
import initial from '../../../public/initial.png';
import ImageUploadComponent from '@/components/ImageUpload';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [curso, setCurso] = useState('');
  const [errors, setErrors] = useState<{ 
    email?: string; 
    password?: string; 
    nome?: string; 
    departamento?: string; 
    curso?: string;
  }>({});

  const router = useRouter();
  const { login, loading } = useAuth();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; 
        nome?: string; departamento?: string; curso?: string } = {};
    
    if (!email) newErrors.email = 'Email é obrigatório';
    if (!password) newErrors.password = 'Senha é obrigatória';
    if (!nome) newErrors.nome = 'Nome é obrigatório';
    if (!departamento) newErrors.departamento = 'Departamento é obrigatório';
    if (!curso) newErrors.curso = 'Curso é obrigatório';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      // For testing purposes, use the credentials:
      // email: teste@example.com
      // password: senha123
      await login(email, password);
      toast.success('Login realizado com sucesso!');
      router.push('/');
    } catch (error) {
      toast.error('Credenciais inválidas. Tente novamente.');
    }
  };

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

        <div className="flex flex-col items-center justify-start w-1/2 bg-[#EDEDED] -mt-4">

          <div className=" -mb-8 max-w-lg"> 
            <ImageUploadComponent />
          </div>

          <form className="w-full max-w-lg space-y-4">
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
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
          </form>
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
        </div>

      </div>
    </>
  );
}
