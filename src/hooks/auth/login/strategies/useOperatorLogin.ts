import { fetchWithAuth } from '@/api/fetchWithAuth';
import { useAuthStatus } from '@/auth/hooks/useAuthStatus';
import { API_BASE_URL } from '@/config/api';
import { useState } from 'react';
import { z } from 'zod';

interface OperatorLoginHook {
  login: (username: string, password: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

const AuthResponseSchema = z.object({
  access_token: z.string(),
});

const ErrorResponseSchema = z.object({
  message: z.string(),
});

type AuthResponse = z.infer<typeof AuthResponseSchema>;

export function useOperatorLogin(): OperatorLoginHook {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setIsAuthenticated } = useAuthStatus();

  async function login(username: string, password: string): Promise<boolean> {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/auth/login/operator`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const json: unknown = await response.json();

      if (!response.ok) {
        let message = 'Erro no login do operador.';

        try {
          const parsedError = ErrorResponseSchema.parse(json);
          message = parsedError.message;
        } catch {
          // fallback na mensagem padrão
        }

        throw new Error(message);
      }

      const data: AuthResponse = AuthResponseSchema.parse(json);
      localStorage.setItem('access_token', data.access_token);
      setIsAuthenticated(true);
      return true;

    } catch (err: unknown) {
      console.log(err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido no login do operador.');
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { login, loading, error };
}
