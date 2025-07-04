import { User } from "./user";

export interface Comentario{
    conteudo: string; 
    usuarioID: number; 
    usuario : User;
    avaliacaoID: number; 
    createdAt: Date;
    updatedAt: Date;
}
