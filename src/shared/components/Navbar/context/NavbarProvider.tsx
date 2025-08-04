import { useRef, useMemo, type ReactNode } from 'react';
import type { INavbarValue } from '../types/navbar-context';
import { NavbarContext } from './NavbarContext';

export function NavbarProvider({ children }: { children: ReactNode }) {
	const storeRef = useRef<Record<string, INavbarValue>>({});

	const createValueForKey = (): INavbarValue => {
		let title: string | undefined;
		let actions: ReactNode[] = [];
		let backTo: string | undefined;

		const listeners = new Set<() => void>();

		const notify = () => listeners.forEach((l) => l());

		const value: INavbarValue = {
			get title() {
				return title;
			},
			get actions() {
				return actions;
			},
			get backTo() {
				return backTo;
			},
			setTitle: (t) => {
				title = t;
				notify();
			},
			setActions: (a) => {
				actions = a;
				notify();
			},
			setBackTo: (b) => {
				backTo = b;
				notify();
			},
			reset: () => {
				title = undefined;
				actions = [];
				backTo = undefined;
				notify();
			},
		};

		return value;
	};

	const getOrCreateValue = (key: string) => {
		if (!storeRef.current[key]) {
			storeRef.current[key] = createValueForKey();
		}
		return storeRef.current[key];
	};

	const contextValue = useMemo(() => {
		return {
			get: (key: string) => getOrCreateValue(key),
		};
	}, []);

	return (
		<NavbarContext.Provider value={contextValue}>
			{children}
		</NavbarContext.Provider>
	);
}
