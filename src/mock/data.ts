import { Professor, Disciplina } from '../types/professor';
import { User } from '../types/user';
import { AvaliacaoData } from '../services/professor';

// Mock Professors
export const mockProfessores: Professor[] = [
  { id: 1, nome: 'João Silva', disciplina: 'Matemática', avatar: '/quagsire.png' },
  { id: 2, nome: 'Maria Santos', disciplina: 'Física', avatar: '/quagsire.png' },
  { id: 3, nome: 'Carlos Oliveira', disciplina: 'Química', avatar: '/quagsire.png' },
  { id: 4, nome: 'Ana Pereira', disciplina: 'Biologia', avatar: '/quagsire.png' },
  { id: 5, nome: 'Roberto Almeida', disciplina: 'História', avatar: '/quagsire.png' },
];

// Mock Disciplinas
export const mockDisciplinas: Disciplina[] = [
  { id: 1, nome: 'Matemática' },
  { id: 2, nome: 'Física' },
  { id: 3, nome: 'Química' },
  { id: 4, nome: 'Biologia' },
  { id: 5, nome: 'História' },
  { id: 6, nome: 'Geografia' },
  { id: 7, nome: 'Português' },
  { id: 8, nome: 'Inglês' },
];

// Mock User
export const mockUser: User = {
  id: 1,
  nome: 'Usuário Teste',
  email: 'usuario@teste.com',
  senha: 'senha123',
  departamento: 'cic',
  curso: 'cic'
};

// Mock Avaliações
export const mockAvaliacoes: Array<AvaliacaoData & { id: number }> = [
  {
    id: 1,
    usuarioID: 1,
    professorID: 1,
    disciplinaID: 1,
    conteudo: 'Ótimo professor de Matemática!',
  },
  {
    id: 2,
    usuarioID: 1,
    professorID: 2,
    disciplinaID: 2,
    conteudo: 'Explica muito bem o conteúdo de Física.',
  },
];

// Helper function to add a new avaliação with an auto-incremented ID
export const addAvaliacao = (avaliacao: AvaliacaoData): AvaliacaoData & { id: number } => {
  const newId = mockAvaliacoes.length + 1;
  const newAvaliacao = { ...avaliacao, id: newId };
  mockAvaliacoes.push(newAvaliacao);
  return newAvaliacao;
};