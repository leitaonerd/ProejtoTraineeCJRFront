// This is a simple mock authentication system for testing purposes

/**
 * Simulates login functionality by setting a dummy token in localStorage
 */
export const login = (email: string, password: string): Promise<{ token: string }> => {
  return new Promise((resolve, reject) => {
    // Simulate API delay
    setTimeout(() => {
      // Simple validation - in real app you would verify with a real API
      if (email === 'teste@example.com' && password === 'senha123') {
        // Create a mock token
        const token = 'mock-jwt-token-' + Math.random().toString(36).substring(2);
        localStorage.setItem('token', token);
        resolve({ token });
      } else {
        reject(new Error('Credenciais inválidas'));
      }
    }, 800);
  });
};

/**
 * Simulates logout functionality by removing token from localStorage
 */
export const logout = (): Promise<void> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      localStorage.removeItem('token');
      resolve();
    }, 300);
  });
};

/**
 * Checks if the user is logged in
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('token');
};

/**
 * Mock function to register a new user
 */
export const register = (
  nome: string,
  email: string,
  password: string
): Promise<{ token: string }> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // In a real app, you'd send this data to your backend
      // For testing, we'll just create a token immediately
      const token = 'mock-jwt-token-' + Math.random().toString(36).substring(2);
      localStorage.setItem('token', token);
      resolve({ token });
    }, 1000);
  });
};
