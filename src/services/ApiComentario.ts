import { Comentario } from "@/types/comentario"
import api from "./api"

export const getComentarios = async () => {
  const response = await api.get('/comentario')
  return response.data
}

export const createComentario = async (data : Comentario) => {
  const token = localStorage.getItem("token");
  return await api.post(`/comentario`,data,{headers:{Authorization : `Bearer ${token}`}})
}

export const delComentario = async (id : Number) => {
  const token = localStorage.getItem("token");
  return await api.delete(`/comentario/${id}`,{headers:{Authorization : `Bearer ${token}`}})
}