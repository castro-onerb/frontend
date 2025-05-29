import type { ReactNode } from 'react';

interface ICalendarCardTitleProps {
  children: ReactNode;
}

export function CalendarCardTitle({ children }: ICalendarCardTitleProps) {
  return (
    <p className="font-semibold text-slate-600">{children}</p>
  );
}
