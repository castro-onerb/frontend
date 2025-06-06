// src/auth/hooks/useAuthUser.ts
import { jwtDecode } from 'jwt-decode';

type Role = 'operator' | 'medical';

interface JwtPayload {
  sub: string; // ID do usuário
  name?: string;
  role?: Role;
  exp: number;
}

export function useAuthUser() {
  const token = localStorage.getItem('access_token');

  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return {
      id: decoded.sub,
      name: decoded.name,
      role: decoded.role,
    };
  } catch {
    return null;
  }
}
