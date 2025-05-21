export const API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL || 'http://192.168.2.174:3333';

function getAccessToken(): string | null {
  return localStorage.getItem('access_token');
}

function setAccessToken(token: string) {
  localStorage.setItem('access_token', token);
}

async function refreshAccessToken(): Promise<string | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (data?.access_token) {
      setAccessToken(data.access_token);
      return data.access_token;
    }

    return null;
  } catch {
    return null;
  }
}

export async function fetchWithAuth(
  input: RequestInfo | URL,
  init: RequestInit = {}
): Promise<Response> {
  const accessToken = getAccessToken();

  let response = await fetch(input, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
    credentials: 'include',
  });

  if (response.status === 401) {
    const newToken = await refreshAccessToken();

    // if (!newToken) {
    //   window.location.href = '/';
    //   return Promise.reject('Refresh token inválido ou expirado');
    // }

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
