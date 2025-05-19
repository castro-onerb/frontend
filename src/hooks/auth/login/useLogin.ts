import { useMedicalLogin } from './strategies/useMedicalLogin';
import { useOperatorLogin } from './strategies/useOperatorLogin';

type LoginType = 'medical' | 'operator';

export function useLogin(type: LoginType) {
  const medical = useMedicalLogin();
  const operator = useOperatorLogin();

  switch (type) {
    case 'medical':
      return {
        login: medical.login,
        loading: medical.loading,
        error: medical.error
      };
    case 'operator':
      return {
        login: operator.login,
        loading: operator.loading,
        error: operator.error
      };
    default:
      throw new Error(`Tipo de login não suportado: ${type}`);
  }
}
