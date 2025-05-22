import { API_BASE_URL, fetchWithAuth } from '@/api/fetchWithAuth';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

interface AuthContextProps {
  isAuthenticated: boolean | null; // null enquanto está carregando/verificando
  setIsAuthenticated: (auth: boolean) => void;
}

// Cria o contexto
const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: null,
  setIsAuthenticated: () => {},
});

// Provider para envolver sua aplicação
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetchWithAuth(`${API_BASE_URL}`);
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
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

// Hook customizado para acessar o contexto
export const useAuth = () => useContext(AuthContext);
