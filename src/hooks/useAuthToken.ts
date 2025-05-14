async function fetchWithAuth(input: RequestInfo, init?: RequestInit) {
  const token = localStorage.getItem("access_token");

  const response = await fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${token}`,
    },
    credentials: "include", // importante se o refresh usa cookie
  });

  if (response.status === 401) {
    // tenta fazer refresh
    const refreshRes = await fetch("/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    if (refreshRes.ok) {
      const { access_token } = await refreshRes.json();
      localStorage.setItem("access_token", access_token);

      // refaz a requisição original com novo token
      return fetch(input, {
        ...init,
        headers: {
          ...init?.headers,
          Authorization: `Bearer ${access_token}`,
        },
      });
    } else {
      // falha no refresh: redireciona p/ login
      window.location.href = "/login";
    }
  }

  return response;
}
