import { fetchWithAuth } from '@/api/fetchWithAuth';
import type { SchedulingDTO } from './types/scheduling.dto';
import { API_BASE_URL } from '@/config/api';

export async function FetchSchedulersByMedical(date: string): Promise<SchedulingDTO[]> {
  const url = `${API_BASE_URL}/medical/daily-schedulings?date=${date}`;
  const schedulings = await fetchWithAuth(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  return await schedulings.json() as SchedulingDTO[];
}
