import { createContext } from 'react';

type AttendanceStatus = 'in_attendance' | 'paused';

export interface ActiveAttendance {
  id: number;
  status: AttendanceStatus;
  startedAt: string;
}

interface AttendanceContextData {
  attendances: ActiveAttendance[];
  current: ActiveAttendance | null;
  paused: ActiveAttendance[];
  hasAnyActive: boolean;
  refresh: () => Promise<void>;
  loading: boolean;
}

export const AttendanceContext = createContext<AttendanceContextData | null>(null);
