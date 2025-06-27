import axios from "axios";
import api from "./api"
import { User } from "../types/user";

export interface AuthResponse {
  token: string;
};

export interface LoginData {
  email: string;
  senha: string;
}


export const handleLogin = async (data: LoginData) => {
  const response = await api.post('/login', data);
  return response.data;
}


export async function handleRegister(data : User) {
 const formData = new FormData(); //pacote de envio de requisicoes http especial para mandar files

  formData.append('nome', data.nome);
  formData.append('email', data.email);
  formData.append('senha', data.senha);
  formData.append('departamento', data.departamento);
  formData.append('curso', data.curso);

  if (data.fotoPerfil) {
    formData.append('fotoPerfil', data.fotoPerfil);
  }

  const response = await api.post('/usuario', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}


