import { API_BASE_URL } from '@/shared/config/api.config';
import { z } from 'zod';

function getAccessToken(): string | null {
  return localStorage.getItem('access_token');
}

function setAccessToken(token: string) {
  localStorage.setItem('access_token', token);
}

function removeAccessToken() {
  localStorage.removeItem('access_token');
}

const RefreshResponseSchema = z.object({
  access_token: z.string(),
});

async function refreshAccessToken(): Promise<string | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/me/refresh-token`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!res.ok) return null;

    const json: unknown = await res.json();
    const data = RefreshResponseSchema.parse(json);

    setAccessToken(data.access_token);
    return data.access_token;
  } catch (err: unknown) {
    if (err instanceof TypeError && err.message === 'Failed to fetch') {
      window.dispatchEvent(new Event('connection-error'));
      throw new Error('Sem conexão com o servidor. Confira sua internet ou tente mais tarde.');
    }

    return null;
  }
}

export async function fetchWithAuth(
  input: RequestInfo | URL,
  init: RequestInit = {}
): Promise<Response> {
  const accessToken = getAccessToken();
  let response: Response;

  try {
    response = await fetch(input, {
      ...init,
      headers: {
        ...init.headers,
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
      credentials: 'include',
    });
  } catch (err) {
    if (err instanceof TypeError && err.message === 'Failed to fetch') {
      window.dispatchEvent(new Event('connection-error'));
      throw new Error('Sem conexão com o servidor. Confira sua internet ou tente mais tarde.');
    }
    throw err;
  }

  if (response.status === 401) {
    const newToken = await refreshAccessToken();

    if (!newToken) {
      removeAccessToken();
      window.dispatchEvent(new Event('auth-failed'));
      return Promise.reject(new Error('Refresh token inválido ou expirado'));
    }

    response = await fetch(input, {
      ...init,
      headers: {
        ...init.headers,
        Authorization: `Bearer ${newToken}`,
      },
      credentials: 'include',
    });
  }

  return response;
}
