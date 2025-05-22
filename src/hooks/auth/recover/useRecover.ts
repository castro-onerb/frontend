import { API_BASE_URL } from "@/api/fetchWithAuth";
import { useState } from "react";

export function useRecover() {
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState<{ message: string, success: boolean } | null>(null);
  const [step, setStep] = useState<'recover' | 'reset' | 'done'>('recover');

  async function handleRecover(email: string) {
    setLoading(true);
    setMetadata(null);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/recovery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Erro ao solicitar recuperação');
      }

      setMetadata({ success: data.success, message: data.message });
      setStep('reset');
    } catch (err: any) {
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setMetadata({ success: false, message: 'Sem conexão com o servidor. Confira sua internet ou tente mais tarde.' });
      } else {
        setMetadata({ success: false, message: err.message || 'Erro ao solicitar recuperação' });
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleReset(email: string, code: string, password: string) {
    setLoading(true);
    setMetadata(null);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, code, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao redefinir senha');
      }

      setStep('done');
    } catch (err: any) {
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setMetadata({ success: false, message: 'Sem conexão com o servidor. Confira sua internet ou tente mais tarde.' });
      } else {
        setMetadata({ success: false, message: err.message || 'Erro ao redefinir senha'});
      }
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
    metadata,
    setMetadata,
    step,
    handleRecover,
    handleReset,
    handleResendCode
  };
}
