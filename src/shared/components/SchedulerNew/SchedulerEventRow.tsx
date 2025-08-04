import clsx from 'clsx';
import type { ReactNode } from 'react';

interface SchedulerEventRowProps {
	children: ReactNode;
	className?: string;
	disabled?: boolean;
	onClick?: () => void;
}

export function SchedulerEventRow({ children, className, disabled, onClick }: SchedulerEventRowProps) {
	return (
		<div
			onClick={onClick}
			className={clsx('relative', 'flex items-center gap-4 py-2 leading-none px-2.5 flex-1 hover:bg-slate-100 rounded-full cursor-pointer transition', disabled && 'opacity-70 bg-slate-100',className)}>
			{children}
		</div>
	);
}
