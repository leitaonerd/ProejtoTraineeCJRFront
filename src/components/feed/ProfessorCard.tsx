// components/feed/ProfessorCard.tsx
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { theme } from '../../styles/theme';
import { ProfessorCardProps } from '../../types/professor';

const ProfessorCard: React.FC<ProfessorCardProps> = ({ id, nome, disciplina, avatar }) => {
  const router = useRouter();
  
  const handleClick = () => {
    if (id) {
      router.push(`/professor/${id}`);
    }
  };
  
  return (
    <div 
      onClick={handleClick}
      style={{ 
        backgroundColor: theme.colors.white, 
        padding: '1.5rem', 
        borderRadius: '8px', 
        textAlign: 'center', 
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
      }}
    >
      <Image src={avatar || '/quagsire.png'} alt={nome} width={100} height={100} style={{ borderRadius: '50%', marginBottom: '1rem' }} />
      <h3 style={{ margin: '0.5rem 0', fontSize: '1.2rem', color: theme.colors.text }}>{nome}</h3>
      <p style={{ color: theme.colors.gray, margin: '0' }}>{disciplina}</p>
    </div>
  );
};

export default ProfessorCard;
