import { createContext, useContext } from 'react';
import type { CalendarType } from '../../@types/calendar-types';

export const CardThemeContext = createContext<CalendarType | undefined>(undefined);

export const useCardTheme = () => {
  const context = useContext(CardThemeContext);
  if (!context) {
    throw new Error('useCardTheme must be used within a CalendarCard');
  }
  return context;
};
