export interface MyEvent {
  id: string;
  name: string;
  paid: boolean;
  start: Date;
  end: Date;
  allDay: boolean;
  situation: string;
  status: 'red' | 'purple' | 'pink' | 'emerald';
  statusLabel: string,
  statusLegend: string,
  modality: 'presencial' | 'telemedicina' | 'desconhecida';
  procedure: string;
}