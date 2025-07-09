import { User } from "./user";

export interface Comentario{
    id? : number;
    conteudo: string; 
    usuarioID: number; 
    usuario?: User;
    avaliacaoID: number; 
    createdAt?: Date;
    updatedAt?: Date;
}
