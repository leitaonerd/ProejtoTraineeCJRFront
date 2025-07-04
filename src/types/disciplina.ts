import { Avaliacao } from "./avaliacao"
import { Professor } from "./professor"

export interface Disciplina{
    id?: number
    nome: String
    professorID: number
    createdAt?: Date;
    updatedAt?: Date;
}