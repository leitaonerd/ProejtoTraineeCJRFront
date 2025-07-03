import api from './api';

export const getAllUsers = async () => {
  const response = await api.get("/usuario");
  return response.data;
};

export const getUser = async (id: number) => {
  const response = await api.get(`/usuario/${id}`);
  return response.data;
};

