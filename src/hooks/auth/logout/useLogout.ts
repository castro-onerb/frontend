import { useState, useContext } from 'react';
import { AuthContext } from '@/auth/context/AuthProvider';
import { API_BASE_URL } from '@/shared/config/api';

interface UseLogoutHook {
  handleLogout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useLogout(): UseLogoutHook {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setIsAuthenticated } = useContext(AuthContext);

  async function handleLogout(): Promise<void> {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/me/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      localStorage.removeItem('access_token');
      window.dispatchEvent(new Event('auth-failed'));
      setIsAuthenticated(false);

      if (!response.ok) {
        throw new Error('Erro ao encerrar sessão.');
      }

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao sair');
    } finally {
      setLoading(false);
    }
  }

  return { handleLogout, loading, error };
}
