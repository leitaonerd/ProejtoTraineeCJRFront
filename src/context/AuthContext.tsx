// src/context/AuthContext.tsx

import { UpdateUser, User } from '@/types/user';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define o formato dos dados que nosso contexto irá fornecer
interface AuthContextType {
  isLoggedIn: boolean;
  loading: boolean;
  user: User | null; // O tipo User | null está correto
  login: (token: string, userData: User) => void; // MODIFICADO: login agora recebe userData
  logout: () => void;
  updateUser: (newUserData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userDataString = localStorage.getItem('userData'); // Tentamos recuperar os dados do usuário

    if (token && userDataString) {
      try {
        const parsedUserData: User = JSON.parse(userDataString);
        setIsLoggedIn(true);
        setUser(parsedUserData); // Define o usuário ao iniciar se os dados estiverem no localStorage
      } catch (error) {
        console.error("Erro ao parsear dados do usuário do localStorage:", error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        setIsLoggedIn(false);
        setUser(null);
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
    setLoading(false);
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(userData)); // Armazenar os dados do usuário
    setIsLoggedIn(true);
    setUser(userData); // Definir o usuário no estado do contexto
  };

  const updateUser = (newUser : User) => {
    setUser(newUser)
    localStorage.setItem("userData",JSON.stringify(newUser))
  }

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData'); // Limpar os dados do usuário ao fazer logout
    setIsLoggedIn(false);
    setUser(null);
  };

  const value = {
    isLoggedIn,
    loading,
    user, // Inclua o objeto user no valor do contexto
    login,
    logout,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};