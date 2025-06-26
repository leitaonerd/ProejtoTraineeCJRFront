import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link'; 
import { HeadMetaType } from '@/types/headMetaType';
import Input from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import Image from 'next/image';
import initial from '../../../public/initial.png'; // Adjust the path and filename as needed

const metadata: HeadMetaType = {
  title: "Login - Avaliação de Professores",
  description: "Faça login para avaliar professores",
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  const router = useRouter();
  const { login, loading } = useAuth();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) newErrors.email = 'Email é obrigatório';
    if (!password) newErrors.password = 'Senha é obrigatória';
    
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
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
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

        <div className="flex flex-col items-center justify-center w-1/2 h-full bg-[#EDEDED] p-8">

          <div className="text-[43px] text-center mb-10 leading-none font-Questrial">
            Avaliação de <br></br> Professores
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
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
              className='flex items-center justify-start rounded-xl'
            />
          </form>
          <div className='flex flex-col md:flex-row justify-center gap-y-4 gap-x-[29px] mt-12 w-full max-w-lg'> 
              <button
                type="submit"
                className="bg-[#A4FED3] border-2 border-[#222E50] text-[#222E50] text-xl w-[223px] h-[73px] rounded-2xl
                            hover:bg-[#86E0B3] transition-all duration-300 ease-in-out hover:scale-110" 
                disabled={loading}
              >
                {loading ? 'Carregando...' : 'Entrar'}
              </button>
              <button
                type="submit"
                className="bg-[#A4FED3] border-2 border-[#222E50] text-[#222E50] text-xl w-[223px] h-[73px] rounded-2xl
                            hover:bg-[#86E0B3] transition-all duration-300 ease-in-out hover:scale-110 "
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
