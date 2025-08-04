import { useViewport } from '@/shared/utils/viewport-bool';
import clsx from 'clsx';
import { type ReactNode } from 'react';

interface ITemplateProps {
	children: ReactNode;
	sidebar?: ReactNode;
	className?: string;
}

export function TemplateRoot({ children, sidebar, className }: ITemplateProps) {
	const { mobile, tablet, customOnly } = useViewport();

	const isCustom = customOnly(600, 1300);
	const layoutClass = clsx(
		'h-auto bg-slate-50',
		mobile
			? 'flex flex-col-reverse min-h-dvh'
			: sidebar
				? isCustom
					? 'grid grid-cols-[65px_1fr] h-dvh grid-rows-1'
					: 'grid grid-cols-[minmax(0,240px)_1fr] h-dvh'
				: 'flex flex-col min-h-dvh',
		className,
	);

	return (
		<div className={clsx(layoutClass)}>
			{sidebar}
			<div
				className={clsx(
					'relative flex flex-col p-2 py-4 gap-3 flex-1',
					!tablet &&
						'bg-white m-3 rounded-3xl overflow-y-auto p-3 gap-0 border-2 border-slate-100',
				)}
			>
				{children}
			</div>
		</div>
	);
}
