import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types';
import { mockUsers } from '@/data/mock';

interface AuthContextType {
  user: User | null;
  login: (email: string, role: UserRole) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, role: UserRole) => {
    const found = mockUsers.find(u => u.email === email && u.role === role);
    if (found) {
      setUser(found);
      return true;
    }
    // Demo: allow any login by creating a temporary user
    const demoUser: User = {
      id: `demo-${Date.now()}`,
      name: email.split('@')[0],
      email,
      role,
      teamId: role === 'student' ? 'team-1' : undefined,
    };
    setUser(demoUser);
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};