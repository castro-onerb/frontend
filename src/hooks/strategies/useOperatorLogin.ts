import { BACKEND_BASE_URL } from "@/config/api";
import { useState } from "react";

export function useOperatorLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(username: string, password: string) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_BASE_URL}/auth/operator`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message ?? 'Erro no login do operador.');
      console.log(data);

    } catch (err: any) {
      setError(err.message ?? 'Erro desconhecido no login do operador.');
    } finally {
      setLoading(false);
    }
  }

  return { login, loading, error };
}
