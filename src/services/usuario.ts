import { mockUser } from '../mock/data';

// Define a User type for better type safety
export interface User {
  id: number;
  nome: string;
  email: string;
  // Add other user properties as needed
}

// Using mock data instead of API calls
export const getUsuario = async (): Promise<User> => {
  // Simulate a network delay for testing loading states
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // Simulate authenticated/unauthenticated state based on localStorage
  const isAuthenticated = typeof window !== 'undefined' && !!localStorage.getItem('token');
  
  if (!isAuthenticated) {
    throw new Error('Usuário não autenticado');
  }
  
  return mockUser;
};