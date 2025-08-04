import type { ReactNode } from 'react';

interface IFilterHeaderProps {
  children?: ReactNode
}

export function CalendarFilterHeader({ children }: IFilterHeaderProps) {
  return (
    <div className="p-3 flex gap-3 border-b border-slate-200">{children}</div>
  );
}