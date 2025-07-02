import { Professor } from '../types/professor';
import { Avaliacao } from '../types/avaliacao';
import api from './api';

export interface AvaliacaoData {
  usuarioID: number;
  professorID: number;
  disciplinaID: number;
  conteudo: string;
}

export const getProfessores = async (): Promise<Professor[]> => {
  try {
    console.log('Fetching professors from /professores endpoint');
    const response = await api.get('/professores');
    console.log('Successfully fetched professors');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar professores:', error);
    // If still in development, return mock data as fallback
    console.log('Returning mock data as fallback');
    return [
      { id: 1, nome: 'João Silva', disciplina: 'Matemática', avatar: '/quagsire.png' },
      { id: 2, nome: 'Maria Santos', disciplina: 'Física', avatar: '/quagsire.png' },
      { id: 3, nome: 'Carlos Oliveira', disciplina: 'Química', avatar: '/quagsire.png' },
    ];
  }
};

export const getProfessorById = async (id: number): Promise<Professor> => {
  try {
    console.log(`Fetching professor with ID ${id}`);
    const response = await api.get(`/professores/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar professor com ID ${id}:`, error);
    throw error;
  }
};

export const createAvaliacao = async (data: AvaliacaoData): Promise<Avaliacao> => {
  try {
    console.log('Creating avaliação');
    const response = await api.post('/avaliacoes', data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar avaliação:', error);
    throw error;
  }
};

export const getAvaliacoesByProfessor = async (professorId: number): Promise<Avaliacao[]> => {
  try {
    console.log(`Fetching avaliações for professor ${professorId}`);
    const response = await api.get(`/avaliacoes/professor/${professorId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar avaliações do professor ${professorId}:`, error);
    throw error;
  }
};
