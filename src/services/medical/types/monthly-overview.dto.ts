export interface MonthlyOverviewDTO {
  date: string;
  count: number;
  representative: {
    id: string;
    patient_name: string;
    start: string;
    end: string;
    modality: 'in_person' | 'telemedicine' | 'unknown';
    queue_type: 'urgency' | 'special' | 'priority' | 'normal';
  };
}
