import type { ReactNode } from 'react';

interface ICalendarFilterSessionProps {
  title?: string;
  children?: ReactNode
}

export function CalendarFilterSession({ title, children }: ICalendarFilterSessionProps) {
  return (
    <div className="flex flex-col gap-3 py-4 border-b border-slate-200">
      {title && <p className='text-base font-bold text-slate-500'>{title}</p>}
      {children}
    </div>
  );
}
