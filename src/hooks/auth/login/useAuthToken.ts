export async function fetchWithAuth(input: RequestInfo, init?: RequestInit) {
  const token = localStorage.getItem("access_token");

  const response = await fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (response.status === 401) {
    const refreshRes = await fetch("/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    if (refreshRes.ok) {
      const { access_token } = await refreshRes.json();
      localStorage.setItem("access_token", access_token);

      return fetch(input, {
        ...init,
        headers: {
          ...init?.headers,
          Authorization: `Bearer ${access_token}`,
        },
      });
    } else {
      window.dispatchEvent(new Event("auth-failed"));
      return response;
    }
  }

  return response;
}
