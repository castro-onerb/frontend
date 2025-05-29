import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function AuthRedirectListener() {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => {
      void navigate('/');
    };

    window.addEventListener('auth-failed', handler);
    return () => window.removeEventListener('auth-failed', handler);
  }, [navigate]);

  return null;
}
