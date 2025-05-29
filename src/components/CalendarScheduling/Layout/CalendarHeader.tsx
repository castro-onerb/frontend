import type { ReactNode } from 'react';

interface ICalendarHeaderProps {
  children: ReactNode;
}

export function CalendarHeader({ children }: ICalendarHeaderProps) {
  return (
    <div className="p-3 border-b border-slate-200 flex gap-3">{children}</div>
  );
}
