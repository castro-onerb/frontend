export interface MonthlyOverviewDTO {
  date: string;
  count: number;
  representative: {
    id: string;
    patientName: string;
    start: string;
    end: string;
    modality: 'in_person' | 'telemedicine' | 'unknown';
    queueType: 'urgency' | 'special' | 'priority' | 'normal';
  };
}
