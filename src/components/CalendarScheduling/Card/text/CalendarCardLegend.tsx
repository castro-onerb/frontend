import type { ReactNode } from 'react';

interface ICalendarCardLegendProps {
  className?: string;
  children: ReactNode;
}

export function CalendarCardLegend({ className, children }: ICalendarCardLegendProps) {
  return (
    <p className={`text-sm text-slate-600 ${className}`}>{children}</p>
  );
}