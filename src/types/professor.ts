import { Avaliacao } from "./avaliacao";

export interface Professor {
  id? : number;
  nome: string;
  disciplinaID?: number;
  departamento: string
  fotoPerfil?: File | null; 
  createdAt?: Date;
  updatedAt?: Date;
  avaliações?: Avaliacao[]
}

export interface ProfessorCardProps {
  nome: string;
  disciplina: string;
  avatar?: string;
}
