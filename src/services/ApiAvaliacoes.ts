import { Avaliacao } from "@/types/avaliacao"
import api from "./api"

export const getAvaliacoes = async () => {
  const response = await api.get('/avaliacoes')
  return response.data
}

export const getAvaliacao = async (id:number) => {
  const response = await api.get(`/avaliacoes/${id}`)
  return response.data
}

export const createAvaliacao = async (data : Avaliacao) => {
  return await api.post("/avaliacoes",data)
}