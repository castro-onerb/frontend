import { createContext, useContext } from 'react';
import type { IScherdulerEventProps } from '../SchedulerEvent';

export const SchedulerEventContext = createContext<IScherdulerEventProps | null>(null);

export function useSchedulerEvent() {
  const context = useContext(SchedulerEventContext);
  if (!context) throw new Error('useSchedulerEvent must be used within SchedulerEventContext');
  return context;
}
