import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface User {
  email: string;
  name: string;
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, password: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Cargar sesión guardada al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Simulación: acepta cualquier email/contraseña no vacíos
    // En una app real, validarías contra una API
    if (email.trim() === '' || password.trim() === '') return false;
    
    // Obtener nombre desde localStorage si se registró antes, sino usar email como nombre
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (!found) return false;
    
    const userData = { email: found.email, name: found.name };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return true;
  };

  const register = (name: string, email: string, password: string): boolean => {
    if (name.trim() === '' || email.trim() === '' || password.trim() === '') return false;
    
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    if (users.some((u: any) => u.email === email)) return false;
    
    users.push({ name, email, password });
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};