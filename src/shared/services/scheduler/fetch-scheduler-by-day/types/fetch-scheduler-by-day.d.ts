import type { GenderType } from '../../constants/gender';
import type { ModalityType } from '../../constants/modality';
import type { PriorityType } from '../../constants/priority';

export interface FetchSchedulerByDayDto {
	data: [{
		id: string;
		patient_id : string;
		patient_name: string;
		start: string;
		end: string;
		active: boolean;
		paid: boolean;
		procedure: string;
		status: string;
		birth: string;
		canceled_at: string | null;
		confirmed_at: string | null;
		date_atendance: string;
		exam: string;
		gender: { key: 'male' | 'female' | 'other'; label: string };
		medical_report: string | null;
		modality: 'in_person' | 'telemedicine' | 'unknown';
		queue_type: 'urgent' | 'special' | 'priority' | 'normal';
		can_call: boolean;
	}]
}

export interface FetchSchedulerByDayResponse {
	id: string;
	patient_id: string;
	patient_name: string;
	start: Date;
	end: Date;
	active: boolean;
	paid: boolean;
	procedure: string;
	status: string;
	birth: Date | null;
	canceled_at: Date | null;
	confirmed_at: Date | null;
	date_atendance: Date;
	exam: string;
	gender: GenderType;
	medical_report: string | null;
	modality: ModalityType,
	priority: PriorityType,
	can_call: boolean;
}
