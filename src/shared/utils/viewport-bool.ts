import { useEffect, useState } from 'react';

function debounce<T extends (...args: any[]) => void>(fn: T, delay = 150) {
	let timer: number;
	return (...args: Parameters<T>) => {
		clearTimeout(timer);
		timer = window.setTimeout(() => fn(...args), delay);
	};
}

export function useViewport() {
	const [width, setWidth] = useState(() => window.innerWidth);

	useEffect(() => {
		const handleResize = debounce(() => {
			setWidth(window.innerWidth);
		});
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const mobileMax = 540;
	const tabletMax = 840;
	const notebookMax = 1440;

	const mobile = width < mobileMax;
	const tablet = width < tabletMax;
	const notebook = width < notebookMax;
	const desktop = width >= notebookMax;

	const tabletOnly = width >= mobileMax && width < tabletMax;
	const notebookOnly = width >= tabletMax && width < notebookMax;

	const customOnly = (min: number, max: number) => width >= min && width < max;
	const min = (min: number) => width >= min;
	const max = (max: number) => width <= max;

	return {
		width,
		// Faixas diretas
		mobile,
		tablet,
		notebook,
		desktop,

		// Faixas exclusivas
		tabletOnly,
		notebookOnly,

		// Utilitário customizado
		customOnly,
		min,
		max,
	};
}
