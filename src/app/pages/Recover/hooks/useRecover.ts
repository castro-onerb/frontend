import { API_BASE_URL } from '@/shared/config/api.config';
import { useState } from 'react';
import { z } from 'zod';

const ErrorResponseSchema = z.object({
  message: z.string(),
});


const RecoverResponseSchema = z.object({
  message: z.string(),
  success: z.boolean(),
});

type RecoverResponse = z.infer<typeof RecoverResponseSchema>;

type RecoverStep = 'recover' | 'reset' | 'done';
type Metadata = RecoverResponse | null;

interface UseRecoverHook {
  loading: boolean;
  metadata: Metadata;
  setMetadata: React.Dispatch<React.SetStateAction<Metadata>>;
  step: RecoverStep;
  handleRecover: (email: string) => Promise<void>;
  handleReset: (email: string, code: string, password: string) => Promise<void>;
  handleResendCode: (email: string) => Promise<void>;
  forceStepReset: (metadata?: Metadata) => void;
}

export function useRecover(): UseRecoverHook {
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState<Metadata>(null);
  const [step, setStep] = useState<RecoverStep>('recover');

  async function handleRecover(email: string): Promise<void> {
    setLoading(true);
    setMetadata(null);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/recover-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const json: unknown = await response.json();

      if (!response.ok) {
        let errorMessage = 'Erro ao solicitar recuperação';

        try {
          const parsed = ErrorResponseSchema.parse(json);
          errorMessage = parsed.message;
        } catch {
          // usa mensagem padrão
        }

        throw new Error(errorMessage);
      }

      const data: RecoverResponse = RecoverResponseSchema.parse(json);

      setMetadata({ success: data.success, message: data.message });
      setStep('reset');
    } catch (err: unknown) {
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setMetadata({
          success: false,
          message: 'Sem conexão com o servidor. Confira sua internet ou tente mais tarde.'
        });
      } else if (err instanceof Error) {
        setMetadata({ success: false, message: err.message || 'Erro ao solicitar recuperação' });
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleReset(email: string, code: string, password: string): Promise<void> {
    setLoading(true);
    setMetadata(null);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, code, password })
      });

      const json: unknown = await response.json();

      if (!response.ok) {
        let errorMessage = 'Erro ao solicitar recuperação';

        try {
          const parsed = ErrorResponseSchema.parse(json);
          errorMessage = parsed.message;
        } catch {
          // usa mensagem padrão
        }

        throw new Error(errorMessage);
      }

      // resposta ignorada por não ter utilidade
      setStep('done');
    } catch (err: unknown) {
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setMetadata({
          success: false,
          message: 'Sem conexão com o servidor. Confira sua internet ou tente mais tarde.'
        });
      } else if (err instanceof Error) {
        setMetadata({ success: false, message: err.message || 'Erro ao redefinir senha' });
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleResendCode(email: string): Promise<void> {
    await handleRecover(email);
  }

	function forceStepReset(metadata?: Metadata) {
		setStep('reset');
		if (metadata) {
			setMetadata(metadata);
		}
	}

  return {
    loading,
    metadata,
    setMetadata,
    step,
		forceStepReset,
    handleRecover,
    handleReset,
    handleResendCode,
  };
}
