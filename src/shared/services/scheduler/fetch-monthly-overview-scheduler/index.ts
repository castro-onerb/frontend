import { fetchWithAuth } from '@/shared/api/fetchWithAuth';
import type { MonthlyOverviewSchedulerDto, MonthlyOverviewSchedulerResponse } from './types/monthly-overview-scheduler';
import { API_BASE_URL } from '@/shared/config/api.config';
import { MonthlyOverviewSchedulerPresenter } from './presenters/monthly-overview-scheduler.presenter';
import { dayjs } from '@/shared/config/dayjs.config';

export async function FetchMonthlyOverviewScheduler({
  month,
  year,
}: {
  month?: number;
  year?: number;
}): Promise<MonthlyOverviewSchedulerResponse[]> {
  const target = dayjs().set('year', year ?? dayjs().year()).set('month', month ?? dayjs().month());
  const startMonth = target.startOf('month').toISOString();
  const endMonth = target.endOf('month').toISOString();

  const response = await fetchWithAuth(
    `${API_BASE_URL}/medical/me/schedulings/overview/monthly?start=${startMonth}&end=${endMonth}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  );

  const result = (await response.json()) as MonthlyOverviewSchedulerDto;
  return MonthlyOverviewSchedulerPresenter.toView(result);
}
