import { BACKEND_BASE_URL } from '@/config/api'
import { useState } from "react";

export function useMedicalLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(crm: string, password: string) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_BASE_URL}/auth/medical`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crm, password })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message ?? 'Erro no login médico.');
      console.log(data);

    } catch (err: any) {
      setError(err.message ?? 'Erro desconhecido no login médico.');
    } finally {
      setLoading(false);
    }
  }

  return { login, loading, error };
}
