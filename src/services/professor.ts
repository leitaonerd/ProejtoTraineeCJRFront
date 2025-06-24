import { Professor } from '../types/professor';
import { mockProfessores, addAvaliacao } from '../mock/data';

export interface AvaliacaoData {
  usuarioID: number;
  professorID: number;
  disciplinaID: number;
  conteudo: string;
}

// Using mock data instead of API calls
export const getProfessores = async (): Promise<Professor[]> => {
  // Simulate a network delay for testing loading states
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockProfessores;
};

export const createAvaliacao = async (data: AvaliacaoData) => {
  // Simulate a network delay for testing loading states
  await new Promise(resolve => setTimeout(resolve, 800));
  return addAvaliacao(data);
};
