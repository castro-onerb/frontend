import type { ReactNode } from 'react';

interface ICalendarCardBodyProps {
  children?: ReactNode;
}

export function CalendarCardBody({ children }: ICalendarCardBodyProps) {
  return (
    <div className='flex flex-col gap-1'>
      {children}
    </div>
  );
}
