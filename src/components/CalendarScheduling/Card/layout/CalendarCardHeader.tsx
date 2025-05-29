import type { ReactNode } from 'react';

interface ICalendarCardHeaderProps {
  children: ReactNode
}

export function CalendarCardHeader({children}: ICalendarCardHeaderProps) {
  return (
    <div className="">{children}</div>
  );
}