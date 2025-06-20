import React from 'react';

const BuscaProfessor: React.FC = () => {
  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        placeholder="Buscar Professor(a)"
        style={{
          padding: '0.5rem 2rem 0.5rem 2.5rem',
          fontSize: '1rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
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