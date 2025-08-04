import { genderMap } from '../../constants/gender';
import { modalityMap } from '../../constants/modality';
import { priorityMap } from '../../constants/priority';
import type { FetchSchedulerByDayDto, FetchSchedulerByDayResponse } from '../types/fetch-scheduler-by-day';
import { dayjs } from '@/shared/config/dayjs.config';

export class FetchSchedulerByDayPresenter {
	static toView({ data }: FetchSchedulerByDayDto): FetchSchedulerByDayResponse[] {

		return data.map(item => ({
			id: item.id,
			patient_id: item.patient_id,
			patient_name: item.patient_name,
			start: dayjs(item.start).toDate(),
			end: dayjs(item.end).toDate(),
			active: item.active,
			paid: item.paid,
			procedure: item.procedure,
			status: item.status,
			birth: dayjs(item.birth).toDate(),
			canceled_at: dayjs(item.canceled_at).toDate(),
			confirmed_at: dayjs(item.confirmed_at).toDate(),
			date_atendance: dayjs(item.date_atendance).toDate(),
			exam: item.exam,
			gender: genderMap[item.gender.key] ?? item.gender.label,
			medical_report: item.medical_report,
			modality: modalityMap[item.modality],
			priority: priorityMap[item.queue_type],
			can_call: item.can_call,
		}));
	}
}
