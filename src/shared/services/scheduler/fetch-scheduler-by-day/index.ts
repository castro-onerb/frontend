import { fetchWithAuth } from '@/shared/api/fetchWithAuth';
import type { FetchSchedulerByDayDto, FetchSchedulerByDayResponse } from './types/fetch-scheduler-by-day';
import { API_BASE_URL } from '@/shared/config/api.config';
import { FetchSchedulerByDayPresenter } from './presenters/fetch-scheduler-by-day.presenter';

export async function FetchSchedulerByDay(date: string): Promise<FetchSchedulerByDayResponse[]> {
  const url = `${API_BASE_URL}/medical/me/schedulings/daily?date=${date}`;
	const response = await fetchWithAuth(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});

	const result = await response.json() as FetchSchedulerByDayDto;
	return FetchSchedulerByDayPresenter.toView(result);
}
