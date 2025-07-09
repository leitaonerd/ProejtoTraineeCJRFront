import { User } from "@/types/user";
import api from "./api";

export const getAllUsers = async () => {
  const response = await api.get("/usuario");
  return response.data;
};

export const getUser = async (id: number): Promise<User> => {
  const response = await api.get(`/usuario/${id}`);
  return response.data;
};

export const deletarUser = async (id: number) => {
  const token = localStorage.getItem("token");
  return await api.delete(`/usuario/${id}`,{headers:{Authorization : `Bearer ${token}`}});
};

export const updateUsers = async (form : FormData, id:number) => {
  const token = localStorage.getItem("token");
  return await api.put(`/usuario/${id}`, form,{headers:{Authorization : `Bearer ${token}`}});
}
