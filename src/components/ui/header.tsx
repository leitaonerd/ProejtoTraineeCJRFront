import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { theme } from '../../styles/theme';

interface HeaderProps {
  isAuthenticated: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated }) => {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', backgroundColor: theme.colors.secondary }}>
      <Image src="/logo.png" alt="Logo" width={50} height={50} />
      <div>
        {isAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {/* Placeholder icons */}
            <span>🔔</span>
            <Image src="/quagsire.png" alt="User Avatar" width={40} height={40} style={{ borderRadius: '50%' }} />
            <span>📄</span>
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