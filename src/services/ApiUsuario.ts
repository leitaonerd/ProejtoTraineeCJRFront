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
  return await api.delete(`/usuario/${id}`);
};
