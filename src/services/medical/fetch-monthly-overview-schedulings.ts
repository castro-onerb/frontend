import { fetchWithAuth } from '@/shared/api/fetchWithAuth';
import type { MonthlyOverviewDTO } from './types/monthly-overview.dto';
import { API_BASE_URL } from '@/shared/config/api';

type MonthlyOverviewResponse = {
  data: MonthlyOverviewDTO[];
};

export async function FetchMonthlyOverviewSchedulings(): Promise<MonthlyOverviewDTO[]> {
  const response = await fetchWithAuth(API_BASE_URL + '/medical/me/schedulings/overview/monthly', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const result = await response.json() as MonthlyOverviewResponse;
  return Array.isArray(result.data) ? result.data : [];
}
