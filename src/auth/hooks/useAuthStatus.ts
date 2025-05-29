import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthProvider';

export function useAuthStatus() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const onAuthFailed = () => setIsAuthenticated(false);

    window.addEventListener('auth-failed', onAuthFailed);
    return () => window.removeEventListener('auth-failed', onAuthFailed);
  }, [setIsAuthenticated]);

  return { isAuthenticated, setIsAuthenticated };
}
