import React from 'react';
import { theme } from '../../styles/theme';

interface OrdenarDropdownProps {
  onSortChange: (sortOrder: 'asc' | 'desc') => void;
}

const OrdenarDropdown: React.FC<OrdenarDropdownProps> = ({ onSortChange }) => {
  return (
    <select
      onChange={(e) => onSortChange(e.target.value as 'asc' | 'desc')}
      style={{
        padding: '0.5rem 1.5rem',
        fontSize: '1rem',
        backgroundColor: theme.colors.primary,
        color: theme.colors.white,
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
      }}
    >
      <option value="asc">Ordenar A-Z</option>
      <option value="desc">Ordenar Z-A</option>
    </select>
  );
};

export default OrdenarDropdown;