// src/auth/context/AuthProvider.tsx
import { fetchWithAuth } from '@/api/fetchWithAuth';
import { API_BASE_URL } from '@/config/api';
import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react';

interface AuthContextProps {
  isAuthenticated: boolean | null;
  setIsAuthenticated: Dispatch<SetStateAction<boolean | null>>;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: null,
  setIsAuthenticated: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  console.log('context', isAuthenticated);

  useEffect(() => {
    console.log('auth efect');
    const checkAuth = async () => {
      try {
        const res = await fetchWithAuth(`${API_BASE_URL}/auth/profile`);
        setIsAuthenticated(res.ok);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
