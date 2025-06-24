import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { isAuthenticated, login, logout } from '../services/auth';
import { mockUser } from '../mock/data';

// Define the context types
interface AuthContextType {
  isLoggedIn: boolean;
  user: typeof mockUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: async () => {},
  logout: async () => {},
  loading: false,
});

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<typeof mockUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = isAuthenticated();
      
      if (loggedIn) {
        // In a real app, you'd fetch user data here
        setUser(mockUser);
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  // Login handler
  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      await login(email, password);
      setUser(mockUser);
    } finally {
      setLoading(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        user,
        login: handleLogin,
        logout: handleLogout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
