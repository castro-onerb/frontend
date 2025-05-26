import { fetchWithMiddleware } from "@/api/fetchWithMiddleware";
import { BACKEND_BASE_URL } from "@/config/api";
import { useState } from "react";

export function useOperatorLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(username: string, password: string) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchWithMiddleware(`${BACKEND_BASE_URL}/auth/login/operator`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? 'Erro no login do operador.');
      }

      localStorage.setItem('access_token', data.access_token);
      return true;

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro desconhecido no login do operador.');
      }
    } finally {
      setLoading(false);
    }
  }

  return { login, loading, error };
}
