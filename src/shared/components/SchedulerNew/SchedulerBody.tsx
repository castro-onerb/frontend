import { groupEventsByDay } from '@/shared/utils/group-events-by-day';
import { type ReactNode } from 'react';

interface SchedulerBodyProps<T extends { start: Date; end: Date; id: string }> {
	groups: T[];
	render: (event: T[], dateKey: string) => ReactNode;
}

export function SchedulerBody<T extends { start: Date; end: Date; id: string }>({ groups, render }: SchedulerBodyProps<T>) {

	const groupsSame = groupEventsByDay(groups);

	return (
		<div className="flex-1 flex flex-col gap-2 overflow-y-auto">
			{Object.entries(groupsSame).map(([dateKey, group]) => (
				<div key={`group-event-${dateKey}`}>{render(group, dateKey)}</div>
			))}
		</div>
	);
}
