export interface Professor {
  id: number;
  nome: string;
  disciplina: string;
  avatar?: string;
}

export interface Disciplina {
  id: number;
  nome: string;
}

export interface ProfessorCardProps {
  nome: string;
  disciplina: string;
  avatar?: string;
}
