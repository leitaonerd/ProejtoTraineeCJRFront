// components/feed/ProfessorCard.tsx
import React from 'react';
import Image from 'next/image';
import { theme } from '../../styles/theme';

interface ProfessorCardProps {
  nome: string;
  disciplina: string;
  avatar?: string;
}

const ProfessorCard: React.FC<ProfessorCardProps> = ({ nome, disciplina, avatar }) => {
  return (
    <div style={{ backgroundColor: theme.colors.white, padding: '1.5rem', borderRadius: '8px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <Image src={avatar || '/default-avatar.png'} alt={nome} width={100} height={100} style={{ borderRadius: '50%', marginBottom: '1rem' }} />
      <h3 style={{ margin: '0.5rem 0', fontSize: '1.2rem', color: theme.colors.text }}>{nome}</h3>
      <p style={{ color: theme.colors.gray, margin: 0 }}>{disciplina}</p>
    </div>
  );
};

export default ProfessorCard;
