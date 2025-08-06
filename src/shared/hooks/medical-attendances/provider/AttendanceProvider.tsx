import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { AttendanceContext, type ActiveAttendance } from '../context/AttendanceContext';
import { API_BASE_URL } from '@/shared/config/api.config';
import { fetchWithAuth } from '@/shared/api/fetchWithAuth';

interface AttendanceProviderProps {
  children: ReactNode;
}

interface FetchAttendancesResponse {
  attendances: ActiveAttendance[];
}

export function AttendanceProvider({ children }: AttendanceProviderProps) {
  const [attendances, setAttendances] = useState<ActiveAttendance[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAttendances = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth(`${API_BASE_URL}/attendance`);

      const data = await response.json() as FetchAttendancesResponse;

      if (Array.isArray(data.attendances)) {
        setAttendances(data.attendances);
      }
    } catch (error) {
      console.error('[AttendanceContext] Erro ao buscar atendimentos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchAttendances();

    const interval = setInterval(() => {
      void fetchAttendances();
    }, 60000); // atualiza a cada 30s

    return () => clearInterval(interval);
  }, [fetchAttendances]);

  const current = attendances.find((a) => a.status === 'in_attendance') ?? null;
  const paused = attendances.filter((a) => a.status === 'paused');
  const hasAnyActive = attendances.length > 0;

  return (
    <AttendanceContext.Provider
      value={{
        attendances,
        current,
        paused,
        hasAnyActive,
        refresh: fetchAttendances,
        loading,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
}
