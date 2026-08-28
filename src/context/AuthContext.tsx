import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { UserRole } from '../types';

interface AuthUser {
  id: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultUsers: Record<UserRole, AuthUser> = {
  farmer: { id: 'F001', name: 'Ravi Kumar', role: 'farmer' },
  buyer: { id: 'B002', name: 'Priya Sharma', role: 'buyer' },
  procurement_officer: { id: 'PO001', name: 'Selvam K', role: 'procurement_officer' },
  admin: { id: 'A001', name: 'Dr. Arun Kumar', role: 'admin' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem('farmwise_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback((role: UserRole) => {
    const u = defaultUsers[role];
    setUser(u);
    localStorage.setItem('farmwise_user', JSON.stringify(u));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('farmwise_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
