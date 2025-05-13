import { useState } from "react";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(access: string, password: string) {
    setLoading(true);
    setError(null);

    try {

      const response = await fetch('http://localhost:3333/auth/medical', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ crm: access, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? 'Ops, tivemos problema ao tentar realizar um login.');
      }

      const result = await response.json();
      console.log(result);

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(err.message || "Erro ao fazer login.");
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    handleLogin,
    loading,
    error
  };
}
