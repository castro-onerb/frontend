import { API_BASE_URL } from "@/api/fetchWithAuth";
import { Flash } from "@/components/flashMessage/Flash";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom";

export default function DisableCodes() {

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {    
    if (!email) {
      setError("E-mail não fornecido.");
      setLoading(false);
      return;
    }

    const invalidateCodes = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/invalidate-codes?email=${email}`, {
          method: 'GET'
        });

        if (!response.ok) {
          const resMessage = await response.json();
          throw new Error(resMessage.message ?? "Erro ao desativar os códigos.");
        }
      } catch (err: any) {
        setError(err.message || "Erro inesperado.");
      } finally {
        setLoading(false);
      }
    };

    invalidateCodes();
  }, [email]);

  return (
    <div className="flex items-stretch h-screen bg-primary-50">
      {loading && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <Icon icon={`mingcute:loading-3-fill`} className="animate-spin" style={{ fontSize: 60, color: 'FFFFFF' }} />
      </div>
      )}
      <div className="flex flex-col justify-center items-center text-center px-6 max-w-md mx-auto my-auto">
        <h1 className="text-2xl font-semibold text-primary-900 mb-4">Eita, se você está aqui...</h1>
        {error && (
          <Flash.Root variant="error">
            <Flash.Text textElement={<p>{error}</p>} />
          </Flash.Root>
        )}
        {!error && (<p className="text-primary-800 mb-4">
          Calma, está tudo sob controle. Nós desativamos todos os códigos de recuperação por <strong>12 horas</strong> para proteger sua conta.
        </p>)}
        <p className="text-primary-700 mb-6">
          Se você não reconhece essa tentativa, recomendamos fazer login assim que possível e alterar sua senha. Se notar qualquer atividade suspeita, entre em contato com nosso suporte.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition"
        >
          Fazer login
        </Link>
      </div>
    </div>
  )
}