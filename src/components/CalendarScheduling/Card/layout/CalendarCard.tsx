import { type ReactNode } from 'react';
import type { CardType } from '../../@types/calendar-types';
import { CardThemeContext } from './CardThemeContext';

interface CalendarCardProps {
  type: CardType;
  children: ReactNode;
}

const bgVariants: Record<CardType, string> = {
  red: 'bg-red-50 border border-red-100',
  purple: 'bg-purple-50 border border-purple-100',
  pink: 'bg-pink-50 border border-pink-100',
  emerald: 'bg-emerald-50 border border-emerald-100',
};

export function CalendarCard({ type, children }: CalendarCardProps) {
  const bgColor = bgVariants[type] ?? 'bg-gray-50';

  return (
    <CardThemeContext.Provider value={type}>
      <div className={`flex flex-col gap-1 p-1.5 rounded-md ${bgColor}`}>
        {children}
      </div>
    </CardThemeContext.Provider>
  );
}
