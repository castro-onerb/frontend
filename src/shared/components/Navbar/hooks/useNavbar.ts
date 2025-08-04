import { useContext } from 'react';
import { NavbarContext } from '../context/NavbarContext';
import type { INavbarValue } from '../types/navbar-context';

export function useNavbar(key = 'default'): INavbarValue {
	const context = useContext(NavbarContext);
	if (!context) {
		throw new Error('useNavbar must be used within a NavbarProvider');
	}
	return context.get(key);
}
