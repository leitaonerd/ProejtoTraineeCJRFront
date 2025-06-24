import React from 'react';
import { theme } from '../../styles/theme';

interface BuscaProfessorProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const BuscaProfessor: React.FC<BuscaProfessorProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        placeholder="Buscar Professor(a)"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          padding: '0.5rem 2rem 0.5rem 2.5rem',
          fontSize: '1rem',
          borderRadius: '8px',
          border: `1px solid ${theme.colors.gray}`,
          width: '300px'
        }}
      />
      <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}>
        🔍
      </span>
    </div>
  );
};

export default BuscaProfessor;