import type { InitiateAttendanceByIdDto, InitiateAttendanceByIdResponse } from '../types/initiate-attendance-by-id';
import { dayjs } from '@/shared/config/dayjs.config';

export class InitiateAttendanceByIdPresenter {
	static toView({ data }: InitiateAttendanceByIdDto): InitiateAttendanceByIdResponse {

		return {
			id: data.attendance.id,
			medical_id: data.attendance.medical_id,
			patient_id: data.attendance.patient_id,
			observations: data.attendance.observations,
			status: data.attendance.status,
			modality: data.attendance.modality,
			created_at: dayjs(data.attendance.created_at).toDate(),
			started_at: dayjs(data.attendance.started_at).toDate(),
			finished_at: dayjs(data.attendance.finished_at).isValid() ? dayjs(data.attendance.finished_at).toDate() : undefined,
		};
	}
}
