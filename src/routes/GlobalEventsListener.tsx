import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Page500 from '@/app/pages/Exceptions/500';
import { API_BASE_URL } from '@/shared/config/api.config';
import { isPublicRoute } from '@/shared/utils/is-public-route';

/**
 * Eventos globais que o app pode escutar.
 */
const AUTH_FAILED_EVENT = 'auth-failed';
const CONNECTION_ERROR_EVENT = 'connection-error';

export function GlobalEventsListener() {
  const navigate = useNavigate();
  const [hasConnectionError, setHasConnectionError] = useState(false);

  const isPinging = useRef(false);
  const retryCount = useRef(0);
  const MAX_RETRIES = 12; // Tenta por 1 minuto (12 x 5s)


	useEffect(() => {
		const onAuthFailed = () => {
			if (!isPublicRoute()) {
				void navigate('/');
			}
		};

		const onConnectionError = () => {
			setHasConnectionError(true);
		};

		window.addEventListener(AUTH_FAILED_EVENT, onAuthFailed);
		window.addEventListener(CONNECTION_ERROR_EVENT, onConnectionError);

		return () => {
			window.removeEventListener(AUTH_FAILED_EVENT, onAuthFailed);
			window.removeEventListener(CONNECTION_ERROR_EVENT, onConnectionError);
		};
	}, [navigate]);

  useEffect(() => {
    if (!hasConnectionError) return;

    const pingHealth = async () => {
      if (isPinging.current || retryCount.current >= MAX_RETRIES) return;
      isPinging.current = true;

      try {
        const res = await fetch(`${API_BASE_URL}/health`, {
          method: 'GET',
          cache: 'no-store',
        });

        if (res.ok) {
          setHasConnectionError(false);
          retryCount.current = 0;
        } else {
          retryCount.current += 1;
        }
      } catch {
        retryCount.current += 1;
      } finally {
        isPinging.current = false;
      }
    };

    const interval = setInterval(() => {
      void pingHealth();
    }, 5000);

    return () => clearInterval(interval);
  }, [hasConnectionError]);

  if (hasConnectionError) {
    return <Page500 />;
  }

  return null;
}
