import type { EventColorStatus } from '@/components/Scheduler/@types/scheduler-types';

export const situationColorMap: Record<string, EventColorStatus> = {
  finished: 'slate',
  missed: 'orange',
  appoimented: 'pink',
};
export const situationMap: Record<string, string> = {
  finished: 'Atendido',
  missed: 'Faltou',
  appoimented: 'Agendado',
};

export const queueMap = {
  normal: {
    status: 'emerald',
    label: 'Normal',
    legend: 'Atendimento normal',
  },
  priority: {
    status: 'pink',
    label: 'Prioridade',
    legend: 'Atendimento prioritário',
  },
  special: {
    status: 'purple',
    label: 'P. Especial',
    legend: 'Atendimento com prioridade especial',
  },
  urgent: {
    status: 'red',
    label: 'Urgência',
    legend: 'Atendimento urgente',
  },
} as const;

export type QueueType = keyof typeof queueMap;