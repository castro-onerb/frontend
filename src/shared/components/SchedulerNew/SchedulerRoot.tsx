import type { ReactNode } from 'react';

interface SchedulerRootProps {
	children: ReactNode;
}

export function SchedulerRoot({ children }: SchedulerRootProps ) {
	return (
		<div className="relative flex-1 flex flex-col gap-3">{children}</div>
	);
}
