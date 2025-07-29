import { fetchWithAuth } from '@/shared/api/fetchWithAuth';
import { useAuthStatus } from '@/auth/hooks/useAuthStatus';
import { API_BASE_URL } from '@/shared/config/api';
import { useState } from 'react';
import { z } from 'zod';

type LoginType = 'medical' | 'operator';

interface LoginHook {
  login: (accesse: string, password: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

const AuthResponseSchema = z.object({
  access_token: z.string(),
});
type AuthResponse = z.infer<typeof AuthResponseSchema>;

const ErrorResponseSchema = z.object({
  message: z.string(),
});

export function useLogin(type: LoginType): LoginHook {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setIsAuthenticated } = useAuthStatus();

  async function login(access: string, password: string): Promise<boolean> {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          access,
          password,
        }),
      });

      const json: unknown = await response.json();

      if (!response.ok) {
        let message = `Erro no login do ${type === 'medical' ? 'médico' : 'operador'}.`;

        try {
          const parsed = ErrorResponseSchema.parse(json);
          message = parsed.message;
        } catch {
          // mantém a mensagem padrão
        }

        throw new Error(message);
      }

      const data: AuthResponse = AuthResponseSchema.parse(json);
      localStorage.setItem('access_token', data.access_token);
      setIsAuthenticated(true);
      return true;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido no login.');
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { login, loading, error };
}
