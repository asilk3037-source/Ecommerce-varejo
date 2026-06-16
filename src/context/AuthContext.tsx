import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const mockAdminUser: User = {
  id: 'admin-1',
  name: 'Admin SK Services',
  email: 'admin@skservices.com',
  role: 'admin',
  createdAt: '2024-01-01',
  totalOrders: 0,
  totalSpent: 0,
};

const mockCustomerUser: User = {
  id: 'user-1',
  name: 'João Silva',
  email: 'joao@email.com',
  phone: '(11) 98765-4321',
  role: 'customer',
  createdAt: '2024-03-15',
  totalOrders: 5,
  totalSpent: 1250.00,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800));
    if (email === 'admin@skservices.com' && password === 'admin123') {
      setUser(mockAdminUser);
      return true;
    }
    if (email === 'joao@email.com' && password === '123456') {
      setUser(mockCustomerUser);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  const register = async (name: string, email: string, _password: string, phone?: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800));
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      phone,
      role: 'customer',
      createdAt: new Date().toISOString().split('T')[0],
      totalOrders: 0,
      totalSpent: 0,
    };
    setUser(newUser);
    return true;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      login,
      logout,
      register,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
