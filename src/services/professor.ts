import { Professor } from '../types/professor';
import api from './api';

export interface AvaliacaoData {
  usuarioID: number;
  professorID: number;
  disciplinaID: number;
  conteudo: string;
}

// Define backend response types
interface ProfessorResponse {
  id: number;
  nome: string;
  departamento: string;
  disciplinaID: number;
  createdAt: string;
  updatedAt: string;
}

interface DisciplinaResponse {
  id: number;
  nome: string;
  createdAt: string;
  updatedAt: string;
}

interface AvaliacaoResponse {
  id: number;
  conteudo: string;
  createdAt: string;
  updatedAt: string;
  usuarioID: number;
  professorID: number;
  disciplinaID: number;
}

// Get all professors
export const getProfessores = async (): Promise<Professor[]> => {
  try {
    console.log('Fetching professors from backend');
    const response = await api.get<ProfessorResponse[]>('/professores');
    
    console.log('Professores response:', response.data);
    
    if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
      console.warn('No professores returned from the backend or empty array');
      return [];
    }
    
    // Map the response to include the disciplina name instead of just the ID
    const professoresWithDisciplina = await Promise.all(
      response.data.map(async (prof: ProfessorResponse) => {
        try {
          // Get the disciplina details for this professor
          const disciplinaResponse = await api.get<DisciplinaResponse>(`/disciplina/${prof.disciplinaID}`);
          const disciplinaName = disciplinaResponse.data.nome;
          
          return {
            id: prof.id,
            nome: prof.nome,
            disciplina: disciplinaName, // Use the name instead of ID
            avatar: '/quagsire.png' // Default avatar since backend doesn't provide it
          };
        } catch (err) {
          console.warn(`Could not get disciplina ${prof.disciplinaID} for professor ${prof.id}:`, err);
          // If we can't get the disciplina, use the ID as a fallback
          return {
            id: prof.id,
            nome: prof.nome,
            disciplina: `Disciplina ${prof.disciplinaID}`,
            avatar: '/quagsire.png'
          };
        }
      })
    );
    
    console.log('Processed professores with disciplinas:', professoresWithDisciplina);
    return professoresWithDisciplina;
  } catch (error: any) {
    console.error('Erro ao buscar professores:', error);
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

// Get a specific professor by ID
export const getProfessorById = async (id: number): Promise<Professor> => {
  try {
    console.log(`Fetching professor with ID ${id}`);
    const response = await api.get<ProfessorResponse>(`/professores/${id}`);
    
    // Get the disciplina details for this professor
    try {
      const disciplinaResponse = await api.get<DisciplinaResponse>(`/disciplina/${response.data.disciplinaID}`);
      const disciplinaName = disciplinaResponse.data.nome;
      
      return {
        id: response.data.id,
        nome: response.data.nome,
        disciplina: disciplinaName,
        avatar: '/quagsire.png' // Default avatar
      };
    } catch (err) {
      // If we can't get the disciplina, return with the ID as fallback
      return {
        id: response.data.id,
        nome: response.data.nome,
        disciplina: `Disciplina ${response.data.disciplinaID}`,
        avatar: '/quagsire.png'
      };
    }
  } catch (error) {
    console.error(`Erro ao buscar professor com ID ${id}:`, error);
    throw error;
  }
};

// Create a new evaluation
export const createAvaliacao = async (data: AvaliacaoData): Promise<AvaliacaoResponse> => {
  try {
    console.log('Creating avaliação in the backend');
    const response = await api.post<AvaliacaoResponse>('/avaliacoes', data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar avaliação:', error);
    throw error;
  }
};

// Get all evaluations for a specific professor
export const getAvaliacoesByProfessor = async (professorId: number): Promise<AvaliacaoResponse[]> => {
  try {
    console.log(`Fetching avaliações for professor ${professorId}`);
    const response = await api.get<AvaliacaoResponse[]>(`/avaliacoes/professor/${professorId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar avaliações do professor ${professorId}:`, error);
    throw error;
  }
};
