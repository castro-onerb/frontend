import type { ReactNode } from 'react';

interface SchedulerHeaderProps {
	children: ReactNode;
}

export function SchedulerHeader({ children }: SchedulerHeaderProps) {
	return (
		<div className="p-3 bg-slate-50 flex flex-col gap-2 rounded-xl">{children}</div>
	);
}
