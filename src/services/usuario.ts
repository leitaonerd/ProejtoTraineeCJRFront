import { User } from "../types/user";
import api from './api';

interface UserResponse {
  id: number;
  nome: string;
  email: string;
  departamento: string;
  curso: string;
  fotoPerfil?: string;
  createdAt: string;
  updatedAt: string;
}

export const getUsuario = async (): Promise<User> => {
  // Check for authentication token
  const isAuthenticated = typeof window !== 'undefined' && !!localStorage.getItem('token');
  
  if (!isAuthenticated) {
    throw new Error('Usuário não autenticado');
  }
  
  try {
    // Get current user information
    const response = await api.get<UserResponse>('/usuario/me/profile');
    
    // Map the backend response to our frontend user model
    return {
      id: response.data.id,
      nome: response.data.nome,
      email: response.data.email,
      departamento: response.data.departamento,
      curso: response.data.curso,
      avatar: response.data.fotoPerfil ? 
        `data:image/jpeg;base64,${response.data.fotoPerfil}` : 
        '/default-avatar.png'
    };
  } catch (error) {
    console.error('Erro ao buscar informações do usuário:', error);
    throw new Error('Falha ao obter dados do usuário');
  }
};

