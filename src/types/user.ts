import { Avaliacao } from "../types/avaliacao";
import { Comentario } from "./comentario";

export interface User {
  id?: number;
  nome: string;
  email: string;
  senha : string,
  departamento: string;
  curso: string
  fotoPerfil?: string | File | null; 
  createdAt?: Date;
  updatedAt?: Date;
  avaliacoes?: Avaliacao[]
  comentarios?: Comentario[]
}

export interface UpdateUser{
  nome?: string;
  email?: string;
  senha?: string,
  departamento?: string;
  curso?: string
  fotoPerfil?: string
}
