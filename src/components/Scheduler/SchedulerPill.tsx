import clsx from 'clsx';
import type { EventColorStatus } from './@types/scheduler-types';

interface ISchedulerPillProps {
  label: string;
  status: EventColorStatus;
  variant?: 'fill' | 'smooth';
}

const eventStatus: Record<'fill' | 'smooth', Record<EventColorStatus, string>> = {
  fill: {
    red: 'bg-red-500 text-white',
    purple: 'bg-purple-500 text-white',
    pink: 'bg-pink-500 text-white',
    emerald: 'bg-emerald-500 text-white',
    slate: 'bg-slate-500 text-white',
    orange: 'bg-orange-500 text-white'
  },
  smooth: {
    red: 'bg-red-50 text-red-700',
    purple: 'bg-purple-50 text-purple-700',
    pink: 'bg-pink-50 text-pink-700',
    emerald: 'bg-emerald-50 text-emerald-700',
    slate: 'bg-slate-50 text-slate-700',
    orange: 'bg-orange-50 text-orange-700'
  }
};

export function SchedulerPill({ label, status = 'emerald', variant = 'fill' }: ISchedulerPillProps) {
  return (
    <div className={clsx('p-1 px-1.5 text-xs font-medium leading-none rounded-full', eventStatus[variant]?.[status])}>{label}</div>
  );
}
