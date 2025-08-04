import { modalityMap } from '../../constants/modality';
import { priorityMap } from '../../constants/priority';
import type { MonthlyOverviewSchedulerDto, MonthlyOverviewSchedulerResponse } from '../types/monthly-overview-scheduler';
import { dayjs } from '@/shared/config/dayjs.config';

export class MonthlyOverviewSchedulerPresenter {
	static toView({ data }: MonthlyOverviewSchedulerDto): MonthlyOverviewSchedulerResponse[] {

		return data.map(item => ({
			date: dayjs(item.date).toDate(),
			count: item.count,
			representative: {
				id: item.representative.id,
				patient_name: item.representative.patient_name,
				start: dayjs(item.representative.start).toDate(),
				end: dayjs(item.representative.end).toDate(),
				priority: priorityMap[item.representative.queue_type],
				modality: modalityMap[item.representative.modality],
				procedure: item.representative.procedure,
				birth: dayjs(item.representative.birth).isValid() ? dayjs(item.representative.birth).toDate() : null,
				canceled_at: dayjs(item.representative.canceled_at).isValid() ? dayjs(item.representative.canceled_at).toDate() : null,
				confirmed_at: dayjs(item.representative.confirmed_at).isValid() ? dayjs(item.representative.confirmed_at).toDate() : null,
				paid: item.representative.paid,
				realized_at: dayjs(item.representative.realized_at).isValid() ? dayjs(item.representative.realized_at).toDate() : null,
				status: item.representative.status,
				can_call: item.representative.can_call,
			}
		}));
	}
}
