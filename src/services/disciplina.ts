import { Disciplina } from '../types/professor';
import api from './api';

interface DisciplinaResponse {
  id: number;
  nome: string;
  createdAt: string;
  updatedAt: string;
}

export const getDisciplinas = async (): Promise<Disciplina[]> => {
  try {
    console.log('Fetching disciplinas from backend');
    // Change the endpoint from 'disciplinas' to 'disciplina' to match the backend controller
    const response = await api.get<DisciplinaResponse[]>('/disciplina');
    
    console.log('Disciplinas response:', response.data);
    
    if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
      console.warn('No disciplinas returned from the backend or empty array');
      return [];
    }
    
    // Map backend response to our frontend model
    return response.data.map(disc => ({
      id: disc.id,
      nome: disc.nome
    }));
  } catch (error: any) {
    console.error('Erro ao buscar disciplinas:', error);
    if (error.response) {
      console.error('Error response:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Error request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    return []; // Return empty array instead of throwing to prevent UI errors
  }
};
