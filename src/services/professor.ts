// ainda em duvida sobre, pode ter jeitos melhores de fazer
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', //mudar depois
});

export const getProfessores = async () => {
  const response = await api.get('/professores');
  return response.data;
};

export const createAvaliacao = async (data: { usuarioID: number; professorID: number; disciplinaID: number; conteudo: string; }) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
  const response = await api.post('/avaliacoes', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
