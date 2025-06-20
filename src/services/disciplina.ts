// ainda em duvida sobre, pode ter jeitos melhores de fazer
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', //mudar depois
});

export const getDisciplinas = async () => {
  const response = await api.get('/disciplinas');
  return response.data;
};
