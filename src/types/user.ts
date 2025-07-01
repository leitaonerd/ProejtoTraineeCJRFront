import { AvaliacaoData } from "@/services/professor";

export interface User {
  id: number;
  nome: string;
  email: string;
  departamento: string;
  curso: string;
  fotoPerfil?: File | null; 
  avatar?: string; // URL to avatar image
  createdAt?: Date;
  updatedAt?: Date;
  Avaliações?: AvaliacaoData[]
}

export interface UpdateUser{
  nome?: string;
  email?: string;
  senha?: string,
  departamento?: string;
  curso?: string
  fotoPerfil?: string
}