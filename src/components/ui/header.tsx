import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { theme } from '../../styles/theme';
import { User } from '@/types/user';
import { useAuth } from '@/context/AuthContext';
interface HeaderProps {
  isAuthenticated: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated }) => {
  const defaultAvatar = '/default-avatar.png';
  const [fotoUrl, setFotoUrl] = useState<string>(defaultAvatar);
  const {logout} = useAuth()

  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    
    if (userDataString) {
      try {
        const userData: User = JSON.parse(userDataString);

    setFotoUrl(
          userData.fotoPerfil 
            ? `${process.env.NEXT_PUBLIC_API_URL}${userData.fotoPerfil}` 
            : defaultAvatar 
        );


      } catch (error) {
        console.error("Falha ao analisar os dados do usuário do localStorage", error);
      }
    }
  }, []);

  return (    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', backgroundColor: theme.colors.secondary }}>
      <Image src="/next.svg" alt="Logo" width={50} height={50} />
      <div>
        {isAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span>🔔</span>
            <Image src={fotoUrl} alt="User Avatar" width={40} height={40} style={{ borderRadius: '50%', cursor:'pointer' }} />
            <Image src={"/logout-svgrepo-com.png"} alt="Logout" width={30} height={30} style={{ cursor: 'pointer' }}  onClick={logout} />
          </div>
        ) : (
          <Link href="/login">
            <button style={{ padding: '0.5rem 1.5rem', fontSize: '1rem', backgroundColor: theme.colors.primary, color: theme.colors.white, border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              Login
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;