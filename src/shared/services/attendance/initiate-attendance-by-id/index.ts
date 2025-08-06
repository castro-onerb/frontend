import { fetchWithAuth } from '@/shared/api/fetchWithAuth';
import { API_BASE_URL } from '@/shared/config/api.config';
import type { InitiateAttendanceByIdDto } from './types/initiate-attendance-by-id';
import { InitiateAttendanceByIdPresenter } from './presenters/initiate-attendance-by-id.presenter';

export async function InitiateAttendanceById(attendance_id: string) {
	const response = await fetchWithAuth(`${API_BASE_URL}/attendance/start`, {
		method: 'POST',
		body: JSON.stringify({ attendance_id })
	});

	const result = await response.json() as InitiateAttendanceByIdDto;
	return InitiateAttendanceByIdPresenter.toView(result);
}
