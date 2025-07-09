import { Avaliacao, UpdateAvaliacao } from "@/types/avaliacao"
import api from "./api"

export const getAvaliacoes = async () => {
  const response = await api.get('/avaliacoes')
  return response.data
}

export const getAvaliacao = async (id:number) : Promise<Avaliacao> => {
  const response = await api.get(`/avaliacoes/${id}`)
  return response.data
}

export const createAvaliacao = async (data: Partial<Avaliacao>) => {
  const token = localStorage.getItem("token");
  return await api.post("/avaliacoes", data,{headers:{Authorization : `Bearer ${token}`}})
}

export const delAvaliacao = async ( id : number) => {
    const token = localStorage.getItem("token");
    return await api.delete(`/avaliacoes/${id}`)
}

export const updateAvaliacao = async (id : number, conteudo : UpdateAvaliacao) => {
  const token = localStorage.getItem("token");
  return await api.put(`/avaliacoes/${id}`,conteudo,{headers:{Authorization : `Bearer ${token}`}})
}