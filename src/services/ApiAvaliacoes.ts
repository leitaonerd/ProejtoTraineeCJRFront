import { Avaliacao } from "@/types/avaliacao"
import api from "./api"

export const getAvaliacoes = async () => {
  const response = await api.get('/avaliacoes')
  return response.data
}

export const getAvaliacao = async (id:number) : Promise<Avaliacao> => {
  const response = await api.get(`/avaliacoes/${id}`)
  return response.data
}

export const createAvaliacao = async (data : Avaliacao) => {
  return await api.post("/avaliacoes",data)
}

export const delAvaliacao = async ( id : number) => {
    return await api.delete(`/avaliacoes/${id}`)
}