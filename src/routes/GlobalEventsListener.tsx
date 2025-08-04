import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Page500 from '@/app/pages/Exceptions/500';
import { API_BASE_URL } from '@/shared/config/api.config';

export function GlobalEventsListener() {
  const navigate = useNavigate();
  const [hasConnectionError, setHasConnectionError] = useState(false);

  useEffect(() => {
    const onAuthFailed = () => {
      void navigate('/');
    };

    const onConnectionError = () => {
      setHasConnectionError(true);
    };

    window.addEventListener('auth-failed', onAuthFailed);
    window.addEventListener('connection-error', onConnectionError);

    return () => {
      window.removeEventListener('auth-failed', onAuthFailed);
      window.removeEventListener('connection-error', onConnectionError);
    };
  }, [navigate]);

  useEffect(() => {
    if (!hasConnectionError) return;

    const pingHealth = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/health`, {
          method: 'GET',
          cache: 'no-store',
        });
        if (res.ok) {
          setHasConnectionError(false);
        }
      } catch {
        // continua em erro
      }
    };

    const interval = setInterval(() => {
      void pingHealth();
    }, 5000); // 5 segundos

    return () => clearInterval(interval);
  }, [hasConnectionError]);

  if (hasConnectionError) {
    return <Page500 />;
  }

  return null;
}
