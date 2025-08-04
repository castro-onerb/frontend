import type { EventColorStatus } from './@types/scheduler-types';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { SchedulerEventContext, useSchedulerEvent } from './contexts/SchedulerEventContext';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Dropdown } from '../Dropdown/Dropdown';
import { SchedulerEventCard } from './SchedulerEventCard';
import { useViewport } from '@/shared/utils/viewport-bool';
import { formatHourRange } from '@/shared/utils/dates.util';

export interface IScherdulerEventProps {
  title: ReactNode;
  children?: ReactNode;
  start: Date;
  end: Date;
  status: EventColorStatus;
  statusLabel?: string;
  statusLegend?: string;
  onClick?: () => void;
}

const eventStatus: Record<EventColorStatus, string> = {
  red: 'bg-red-500',
  purple: 'bg-purple-500',
  pink: 'bg-pink-500',
  emerald: 'bg-emerald-500',
  slate: 'bg-slate-500',
  orange: 'bg-orange-500'
};

export function SchedulerEvent(props: IScherdulerEventProps) {
  const { max } = useViewport();

  return (
    <SchedulerEventContext.Provider value={props}>
      {max(900) ? <SchedulerEventMobile /> : <SchedulerEventDesktop />}
    </SchedulerEventContext.Provider>
  );
}

export function SchedulerEventMobile() {
  const { start, end, status, statusLabel, title, children, onClick } = useSchedulerEvent();

  return (

    <Dropdown.Root dropdown={
      <SchedulerEventCard />} placement='bottom-start'>
        <div
          onClick={onClick}
          className="gap-2 py-2 leading-none px-2.5 flex-1 hover:bg-slate-50 cursor-pointer transition flex flex-col-reverse border bg-white border-slate-100 rounded-2xl">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <span className="flex gap-1 items-center">
                <span className={clsx('p-1 rounded-full', eventStatus[status] ?? 'bg-gray-50')} />
                <span className='text-sm'>{statusLabel}</span>
              </span>
              <span className='w-[130px] text-sm'>{formatHourRange(start, end)}</span>
            </div>
            <span className='flex gap-2 text-center'>{children}</span>
          </div>
          <p className="line-clamp-1">{title}</p>
        </div>
    </Dropdown.Root>
  );
}

export function SchedulerEventDesktop() {
  const { start, end, status, statusLegend, title, children, onClick } = useSchedulerEvent();

  return (
    <Dropdown.Root dropdown={
			<SchedulerEventCard />
			} placement='bottom-start'>
        <div
          onClick={onClick}
          className="flex items-center gap-4 py-2 leading-none px-2.5 flex-1 hover:bg-slate-100 rounded-full cursor-pointer transition">
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger className='flex items-center'>
                <span className={clsx('p-1.5 rounded-full cursor-help', eventStatus[status] ?? 'bg-gray-50')} />
              </TooltipTrigger>
              <TooltipContent>
                {statusLegend}
              </TooltipContent>
            </Tooltip>

            <span className='w-[130px]'>{formatHourRange(start, end)}</span>
            <span className='w-[100px] text-center'>{children}</span>
          </div>
          <p className="line-clamp-1">{title}</p>
        </div>
    </Dropdown.Root>
  );
}
