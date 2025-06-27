import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'; 
import { HeadMetaType } from '@/types/headMetaType';
import Input from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import initial from '../../../public/initial.png';
import { handleLogin } from '@/services/auth';

const metadata: HeadMetaType = {
  title: "Login - Avaliação de Professores",
  description: "Faça login para avaliar professores",
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha,setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ 
    email?: string; 
    senha?: string 
  }>({});
  const router = useRouter();
   const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      try{
        const response = await handleLogin({email,senha})
        console.log('Resposta completa do backend:', response);
        if (response.access_token) {
          login(response.access_token);
          alert('Login realizado com sucesso!');
          router.push('/'); 
        }
      }catch(error : any){
        alert(`Erro ao realizar o cadastro: ${error}`)
      }
  }
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
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              error={errors.senha}
              className='flex items-center justify-start rounded-xl'
            />
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
              type="button"
                onClick={() => router.push("/cadastro")}
                className="bg-[#A4FED3] border-2 border-[#222E50] text-[#222E50] text-xl w-[223px] h-[73px] rounded-2xl
                            hover:bg-[#86E0B3] transition-all duration-300 ease-in-out hover:scale-110 "
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
