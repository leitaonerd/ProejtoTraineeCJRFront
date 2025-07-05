import { Avaliacao } from "./avaliacao";
import { Disciplina } from "./disciplina";

export interface Professor {
  id?: number;
  nome: string;
  disciplinaID?: number;
  departamento: string;
  fotoPerfil?: File | null;
  createdAt?: Date;
  updatedAt?: Date;
  avaliacoes?: Avaliacao[];
  disciplina?: Disciplina;
}

export interface ProfessorCardProps {
  nome: string;
  disciplina: string;
  avatar?: string;
}
