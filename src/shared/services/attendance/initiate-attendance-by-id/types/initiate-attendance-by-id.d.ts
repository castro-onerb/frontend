import type { AttendanceStatusType } from './attendance-status-type';

export interface InitiateAttendanceByIdDto {
	data: {
		attendance: {
			id: string;
			patient_id: string;
			medical_id: string;
			status: AttendanceStatusType;
			modality: 'telemedicine' | 'in_person' | 'unknown';
			observations?: string;
			started_at: string;
			finished_at?: string;
			created_at: string;
		}
	}
}

export interface InitiateAttendanceByIdResponse {
	id: string;
	patient_id: string;
	medical_id: string;
	status: AttendanceStatusType;
	modality: 'telemedicine' | 'in_person' | 'unknown';
	observations?: string;
	started_at: Date;
	finished_at?: Date | null;
	created_at:  Date;
}
