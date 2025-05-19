import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { API_BASE_URL } from '@/api/fetchWithAuth';

export function useLogout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleLogout() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      localStorage.removeItem('access_token');

      if (!response.ok) {
        throw new Error('Erro ao encerrar sessão.');
      }

      // Se você tiver um AuthContext, reseta ele aqui
      // authContext.setUser(null);
      
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Erro ao sair');
    } finally {
      setLoading(false);
    }
  }

  return { handleLogout, loading, error };
}
