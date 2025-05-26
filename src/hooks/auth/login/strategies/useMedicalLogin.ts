import { fetchWithAuth } from '@/api/fetchWithAuth';
import { BACKEND_BASE_URL } from '@/config/api'
import { useState } from "react";

export function useMedicalLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(crm: string, password: string) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchWithAuth(`${BACKEND_BASE_URL}/auth/login/medical`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crm, password })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message ?? 'Erro no login médico.');
      localStorage.setItem('access_token', data.access_token);
      return true;

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro desconhecido no login do médico.');
      }
  return false;
    } finally {
      setLoading(false);
    }
  }

  return { login, loading, error };
}
