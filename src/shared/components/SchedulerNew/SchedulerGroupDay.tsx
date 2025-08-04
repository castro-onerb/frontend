import { useEffect, useState, type ReactNode } from 'react';
import { dayjs } from '@/shared/config/dayjs.config';
import clsx from 'clsx';
import { useViewport } from '@/shared/utils/viewport-bool';

interface SchedulerGroupDayProps<T extends { start: Date }> {
	events: T[];
	render: (events: T, index: number) => ReactNode;
  isLoading?: boolean;
  onExpand?: () => void;
}

export function SchedulerGroupDay<T extends { start: Date }>({ events, render, isLoading = false, onExpand }: SchedulerGroupDayProps<T>) {

	const { tablet } = useViewport();
	const day = dayjs(events[0].start).format('D');
	const isToday = dayjs(events[0].start).isSame(dayjs(), 'day');
	const dayLabel = dayjs(events[0].start).format('MMM - ddd').toUpperCase();

	const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (isToday) {
      setExpanded(true);
      onExpand?.();
    }
  }, [isToday, onExpand]);

  function handleToggle() {
    const willExpand = !expanded;
    setExpanded(willExpand);
    if (willExpand) onExpand?.();
  }

	return <div className="relative flex items-start gap-2 border-b border-slate-200">
		<button
			onClick={handleToggle}
			className={clsx(
				'top-0 sticky w-9 aspect-square py-1 rounded-full flex items-center gap-1 justify-center text-lg font-semibold cursor-pointer transition border-none',
				isToday ? 'bg-primary-500 text-white' : 'bg-transparent text-slate-700 hover:bg-slate-100'
			)}
		>
			<span>{day}</span>
		</button>
		{!tablet && <span className='top-2 sticky text-sm w-[75px] mt-2'>{dayLabel}</span>}
		<div className="relative flex flex-col gap-2 flex-1">
			{expanded ? (
				isLoading
					? Array.from({ length: events.length - 1 }).map((_, index) => render({} as T, index))
					: events.map((event, index) => render(event, index))
			) : (
				render(events[0], 0)
			)}

			{!expanded && events.length > 1 && (
				<button
					onClick={handleToggle}
					className="text-xs text-primary-500 hover:underline self-start ml-1 cursor-pointer"
				>
					+ {events.length - 1 === 1 ? '1 agendamento' : `${events.length - 1} agendamentos`}
				</button>
			)}
		</div>
	</div>;
}
