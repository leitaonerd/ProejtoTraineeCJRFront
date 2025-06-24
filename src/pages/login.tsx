import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { HeadMetaType } from '@/types/headMetaType';
import Input from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';

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
      
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Entrar</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              error={errors.email}
              disabled={loading}
            />
            
            <Input
              type="password"
              label="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              error={errors.password}
              disabled={loading}
            />
            
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Carregando...' : 'Entrar'}
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <p>
              Não tem uma conta?{' '}
              <Link href="/cadastro" className="text-primary hover:underline">
                Cadastre-se
              </Link>
            </p>
          </div>
          
          {/* Testing credentials for convenience */}
          <div className="mt-8 p-4 bg-gray-50 rounded-md">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Credenciais para teste:</h3>
            <p className="text-xs text-gray-500">Email: teste@example.com</p>
            <p className="text-xs text-gray-500">Senha: senha123</p>
          </div>
        </div>
      </main>
    </>
  );
}
