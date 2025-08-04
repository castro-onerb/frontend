import { useState } from 'react';
import { fetchWithAuth } from '@/shared/api/fetchWithAuth';
import { API_BASE_URL } from '@/shared/config/api.config';
import { useAuthStatus } from '@/shared/auth/hooks/useAuthStatus';

export const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const { setIsAuthenticated } = useAuthStatus();

	const logout = async (): Promise<void> => {
		setLoading(true);

		try {
			await fetchWithAuth(`${API_BASE_URL}/auth/logout`, {
				method: 'POST',
			});
		} catch (error) {
			console.error('Erro ao fazer logout no servidor:', error);
		} finally {
			localStorage.removeItem('access_token');
			setIsAuthenticated(false);

			window.dispatchEvent(new Event('auth-failed'));

			setLoading(false);
		}
	};

	return { logout, loading };
};
