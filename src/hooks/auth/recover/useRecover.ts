import { API_BASE_URL } from "@/api/fetchWithAuth";
import { useState } from "react";

export function useRecover() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'recover' | 'reset' | 'done'>('recover');

  async function handleRecover(email: string) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/recovery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao solicitar recuperação');
      }

      setStep('reset');
    } catch (err: any) {
      setError(err.message || 'Erro ao solicitar recuperação');
    } finally {
      setLoading(false);
    }
  }

  async function handleReset(email: string, code: string, password: string) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, code, password })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao redefinir senha');
      }

      setStep('done');
    } catch (err: any) {
      setError(err.message || 'Erro ao redefinir senha');
    } finally {
      setLoading(false);
    }
  }

  async function handleResendCode(email: string) {
    // Apenas reutiliza a lógica de handleRecover
    await handleRecover(email);
  }

  return {
    loading,
    error,
    step,
    handleRecover,
    handleReset,
    handleResendCode
  };
}
