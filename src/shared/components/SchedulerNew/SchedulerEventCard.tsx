import type { ReactNode } from 'react';

interface SchedulerEventCardProps {
	children: ReactNode;
}

export function SchedulerEventCard({ children }: SchedulerEventCardProps) {
	return (
		<div className="bg-white flex flex-col border-[1.5px] border-slate-200 shadow-xl p-3 rounded-xl lg:min-w-[350px]">
			{children}
		</div>
	);
}
