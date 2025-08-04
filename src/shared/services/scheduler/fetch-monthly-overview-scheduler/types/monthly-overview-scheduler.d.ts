import type { ModalityType } from '../../constants/modality';
import type { PriorityType } from '../../constants/priority';

export interface MonthlyOverviewSchedulerDto {
	data: [{
		date: string;
		count: number;
		representative: {
			id: string;
			patient_name: string;
			start: string;
			end: string;
			modality: 'in_person' | 'telemedicine' | 'unknown';
			queue_type: 'urgent' | 'special' | 'priority' | 'normal';
			procedure: string;
			birth: string | null;
			paid: boolean;
			confirmed_at: Date | null;
			canceled_at: string | null;
			realized_at: string | null;
			status: string;
			can_call: boolean;
		};
	}]
}

export interface MonthlyOverviewSchedulerResponse {
	date: Date,
	count: number,
	representative: {
		id: string;
		patient_name: string;
		start: Date;
		end: Date;
		modality: ModalityType;
		priority: PriorityType,
		procedure: string;
		birth: Date | null;
		paid: boolean;
		confirmed_at: Date | null;
		canceled_at: Date | null;
		realized_at: Date | null;
		status: string;
		can_call: boolean;
	}
}
