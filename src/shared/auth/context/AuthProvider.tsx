// src/auth/context/AuthProvider.tsx
import { fetchWithAuth } from '@/shared/api/fetchWithAuth';
import { API_BASE_URL } from '@/shared/config/api.config';
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

  useEffect(() => {
    console.log('auth efect');
    const checkAuth = async () => {
      try {
        const res = await fetchWithAuth(`${API_BASE_URL}/auth/me`);
        setIsAuthenticated(res.ok);
      } catch {
        setIsAuthenticated(false);
      }
    };

    void checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
