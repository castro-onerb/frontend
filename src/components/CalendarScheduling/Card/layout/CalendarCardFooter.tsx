import type { ReactNode } from 'react';

interface ICalendarCardFooterProps {
  children: ReactNode;
}

export function CalendarCardFooter({ children }: ICalendarCardFooterProps) {
  return (
    <div className="border-t border-black/10">
      {children}
    </div>
  );
}