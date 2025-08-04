import { dayjs } from '@/shared/config/dayjs.config';
import type { MyEvent } from '@/shared/components/CalendarScheduling/Card/CardRoot';
import type { SchedulingDTO } from '../types/scheduling.dto';

export function ApiSchedulingPresenter(apiData: SchedulingDTO[] | undefined): MyEvent[] {
  if (!apiData) return [];

  return apiData.map((item) => {
    const modality = item.modality === 'in_person' ? 'presencial' : item.modality === 'telemedicine' ? 'telemedicina' : 'desconhecida';

    type QueueType = 'normal' | 'priority' | 'special' | 'urgent';
    type StatusColor = 'red' | 'purple' | 'pink' | 'emerald';
    type StatusLabel = 'Normal' | 'Prioridade' | 'P. Especial' | 'Urgência';
    type statusLegend = 'Atendimento normal' | 'Atendimento prioritário' | 'Atendimento com prioridade especial' | 'Atendimento urgente';

    const queueMap: Record<QueueType, { status: StatusColor; label: StatusLabel; legend: statusLegend }> = {
      normal: { status: 'emerald', label: 'Normal', legend: 'Atendimento normal' },
      priority: { status: 'pink', label: 'Prioridade', legend: 'Atendimento prioritário' },
      special: { status: 'purple', label: 'P. Especial', legend: 'Atendimento com prioridade especial' },
      urgent: { status: 'red', label: 'Urgência', legend: 'Atendimento urgente' },
    };

    function isValidQueueType(value: string): value is QueueType {
      return ['normal', 'priority', 'special', 'urgent'].includes(value);
    }

    const statusInfo = isValidQueueType(item.queue_type)
      ? queueMap[item.queue_type]
      : queueMap['normal'];

    const startLocale = item.start.replace(/Z$/, '');
    const endLocale = item.end.replace(/Z$/, '');

    return {
      id: item.id,
      name: item.patient_name,
      start: dayjs(startLocale).toDate(),
      end: dayjs(endLocale).toDate(),
      allDay: false,
      modality,
      paid: item.paid,
      procedure: item.procedure,
      situation: item.status,
      status: statusInfo.status,
      statusLabel: statusInfo.label,
      statusLegend: statusInfo.legend,
    } satisfies MyEvent;
  });
}
