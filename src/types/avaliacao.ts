import { Professor } from '../types/professor';
import { Disciplina } from '../types/disciplina';
import { Comentario } from './comentario';
import { User } from './user';

export interface Avaliacao{
  id?: number;
  conteudo: string;  

  professorID: number; 
  professor?: Professor;

  disciplinaID: number; 
  disciplina?: Disciplina;

  usuarioID: number;
  usuario?: User
  comentarios: Comentario[];
  
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdateAvaliacao {
  conteudo?: string; 
}