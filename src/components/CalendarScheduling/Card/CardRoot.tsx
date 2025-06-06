export interface MyEvent {
  id: string;
  name: string;
  start: Date;
  end: Date;
  allDay: boolean;
  status: 'red' | 'purple' | 'pink' | 'emerald';
  statusLabel: 'Urgência' | 'P. Especial' | 'Prioridade' | 'Normal',
  statusLegend: 'Atendimento urgente' | 'Atendimento com prioridade especial' | 'Atendimento normal' | 'Atendimento com prioridade',
  modality: 'presencial' | 'telemedicina';
  procedure: string;
}