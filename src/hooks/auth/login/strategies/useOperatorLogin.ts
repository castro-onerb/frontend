import { fetchWithAuth } from "@/api/fetchWithAuth";
import { BACKEND_BASE_URL } from "@/config/api";
import { useState } from "react";

export function useOperatorLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(username: string, password: string) {
  setLoading(true);
  setError(null);

  try {
    const response = await fetchWithAuth(`${BACKEND_BASE_URL}/auth/operator`, {
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

  } catch (err: any) {
    if (err instanceof TypeError && err.message === 'Failed to fetch') {
      setError('Ops, não conseguimos conexão com o servidor. Verifique sua internet ou tente novamente mais tarde.');
    } else {
      setError(err.message ?? 'Erro desconhecido no login do operador.');
    }
    return false;

  } finally {
    setLoading(false);
  }
}


  return { login, loading, error };
}
