import type { ReactNode } from 'react';
import { Tooltip, TooltipTrigger } from '../ui/tooltip';
import { TooltipContent } from '@radix-ui/react-tooltip';
import clsx from 'clsx';

interface TooltipRootProps {
	children: ReactNode;
	legend: ReactNode;
	className?: string;
}

export function TooltipRoot({ children, legend, className }: TooltipRootProps) {
	return (
		<Tooltip>
			<TooltipTrigger className={clsx('flex gap-2 items-center', className)}>{children}</TooltipTrigger>
			<TooltipContent className='bg-white shadow-xl p-2 text-sm rounded-2xl border-2 border-slate-50'>{legend}</TooltipContent>
		</Tooltip>
	);
}
