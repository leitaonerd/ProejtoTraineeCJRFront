import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', 
});

export const getProfessores = async () => {
  const response = await api.get('/professores');
  return response.data;
};
