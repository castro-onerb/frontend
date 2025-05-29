import { useMedicalLogin } from './strategies/useMedicalLogin';
import { useOperatorLogin } from './strategies/useOperatorLogin';

type LoginType = 'medical' | 'operator';

interface LoginHook {
  login: (...args: any[]) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export function useLogin(type: LoginType): LoginHook {
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
  }
}
