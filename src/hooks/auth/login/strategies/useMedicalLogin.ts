import { fetchWithAuth } from '@/shared/api/fetchWithAuth';
import { useAuthStatus } from '@/auth/hooks/useAuthStatus';
import { API_BASE_URL } from '@/shared/config/api';
import { useState } from 'react';
import { z } from 'zod';

interface MedicalLoginHook {
  login: (crm: string, password: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

// Schema + Tipagem
const AuthResponseSchema = z.object({
  access_token: z.string(),
});
type AuthResponse = z.infer<typeof AuthResponseSchema>;

const ErrorResponseSchema = z.object({
  message: z.string(),
});

export function useMedicalLogin(): MedicalLoginHook {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setIsAuthenticated } = useAuthStatus();

  async function login(crm: string, password: string): Promise<boolean> {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/auth/login/medical`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crm, password }),
      });

      const json: unknown = await response.json();

      if (!response.ok) {
        let message = 'Erro no login médico.';

        try {
          const parsed = ErrorResponseSchema.parse(json);
          message = parsed.message;
        } catch {
          // Ignora erro de parse, mantém a mensagem padrão
        }

        throw new Error(message);
      }

      // Agora sim: validação e tipagem segura
      const data: AuthResponse = AuthResponseSchema.parse(json);
      localStorage.setItem('access_token', data.access_token);
      setIsAuthenticated(true);
      return true;

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido no login do médico.');
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { login, loading, error };
}
