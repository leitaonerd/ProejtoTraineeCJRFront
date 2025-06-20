// ainda em duvida sobre, pode ter jeitos melhores de fazer
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', //mudar depois
});

export const getUsuario = async () => {
    const response = await api.get("/usuarios/me", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data;
};
