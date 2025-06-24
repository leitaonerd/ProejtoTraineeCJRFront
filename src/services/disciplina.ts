import { Disciplina } from '../types/professor';
import { mockDisciplinas } from '../mock/data';

// Using mock data instead of API calls
export const getDisciplinas = async (): Promise<Disciplina[]> => {
  // Simulate a network delay for testing loading states
  await new Promise(resolve => setTimeout(resolve, 600));
  return mockDisciplinas;
};
