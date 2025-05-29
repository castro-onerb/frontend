import type { ReactNode } from 'react';

interface ICalendarRootProps {
  children: ReactNode;
}

export function CalendarRoot({ children }: ICalendarRootProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl">{children}</div>
  );
}
