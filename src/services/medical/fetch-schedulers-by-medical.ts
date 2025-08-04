import { fetchWithAuth } from '@/shared/api/fetchWithAuth';
import type { SchedulingDTO } from './types/scheduling.dto';
import { API_BASE_URL } from '@/shared/config/api.config';

export async function FetchSchedulersByMedical(date: string): Promise<SchedulingDTO[]> {
  const url = `${API_BASE_URL}/medical/me/schedulings/daily?date=${date}`;
  const response = await fetchWithAuth(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const result = await response.json() as { data: SchedulingDTO[]};
  return Array.isArray(result.data) ? result.data : [];
}
