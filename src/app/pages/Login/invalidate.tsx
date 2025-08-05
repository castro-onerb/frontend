import { Flash } from '@/shared/components/flashMessage/Flash';
import { API_BASE_URL } from '@/shared/config/api.config';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function DisableCodes() {

  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  if (!id) {
    setError('ID da sessão não fornecido.');
    setLoading(false);
    return;
  }

  const invalidateSession = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/sessions/${id}/invalidate`, {
        method: 'GET'
      });

      if (!response.ok) {
        const resMessage = await response.json() as { message: string };
        throw new Error(resMessage.message ?? 'Erro ao invalidar a sessão.');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  void invalidateSession();
}, [id]);

  return (
    <div className="flex items-stretch h-dvh bg-primary-50">
      {loading && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <Icon icon={'mingcute:loading-3-fill'} className="animate-spin" style={{ fontSize: 60, color: 'FFFFFF' }} />
      </div>
      )}
      <div className="flex flex-col justify-center items-center text-center px-6 max-w-md mx-auto my-auto">
        <h1 className="text-2xl font-semibold text-primary-900 mb-4">
					Sua sessão foi encerrada por segurança
				</h1>
        {error && (
          <Flash.Root variant="error">
            <Flash.Text textElement={<p>{error}</p>} />
          </Flash.Root>
        )}
        {!error && (<p className="text-primary-800 mb-4">
					Para proteger sua conta, encerramos a sessão ativa que detectamos em outro dispositivo ou local incomum. Essa é uma medida preventiva.
				</p>)}
        <p className="text-primary-700 mb-6">
					Se essa atividade foi você mesmo, basta fazer login novamente. Mas se não reconhece, recomendamos alterar sua senha o quanto antes e verificar se há algo incomum em sua conta.
				</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition"
        >
          Fazer login
        </Link>
      </div>
    </div>
  );
}
