import { Comentario } from "@/types/comentario"
import api from "./api"

export const getComentarios = async () => {
  const response = await api.get('/comentario')
  return response.data
}

export const getComentario = async (id:number) => {
  const response = await api.get(`/comentario/${id}`)
  return response.data
}

export const createComentario = async (data : Comentario) => {
  return await api.post(`/comentario`,data)
}