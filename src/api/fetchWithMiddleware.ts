import { fetchWithAuth } from "./fetchWithAuth";

export async function fetchWithMiddleware(input: RequestInfo, init?: RequestInit): Promise<Response> {
  try {
    const response = await fetchWithAuth(input, init);
    return response;
  } catch (err: unknown) {
    if (err instanceof TypeError && err.message === 'Failed to fetch') {
      throw new Error('Sem conexão com o servidor. Confira sua internet ou tente mais tarde.');
    }

    throw err;
  }
}
