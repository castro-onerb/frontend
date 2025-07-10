import { Template } from '@/layout/template';
import { Scheduler as SchedulerComponent } from '@/components/Scheduler/Scheduler';
import { useQueries, useQuery } from '@tanstack/react-query';
import { FetchSchedulersByMedical } from '@/services/medical/fetch-schedulers-by-medical';
import { useViewport } from '@/utils/ViewportBool';
import { ApiSchedulingPresenter } from '@/services/medical/presenters/apiSchedulingPresenter';
import { useEffect, useState } from 'react';
import { FetchMonthlyOverviewSchedulings } from '@/services/medical/fetch-monthly-overview-schedulings';
import type { MyEvent } from '@/components/CalendarScheduling/Card/CardRoot';
import { dayjs } from '@/utils/dayjs-config';
import { queueMap, situationColorMap, situationMap, type QueueType } from './constants';

export default function Scheduler() {

  const { viewer } = useViewport(900, 1240);
  const [expandedDates, setExpandedDates] = useState<string[]>([]);

  function handleExpandDay(date: string) {
    setExpandedDates((prev) =>
      prev.includes(date) ? prev : [...prev, date]
    );
  }

  const {
    data: overviewData,
    isLoading: isLoadingOverview,
  } = useQuery({
    queryKey: ['monthly-overview-schedulings'],
    queryFn: FetchMonthlyOverviewSchedulings,
  });

  const dailyResults = useQueries({
    queries: expandedDates.map((date) => ({
      queryKey: ['daily-schedulings', date],
      queryFn: () => FetchSchedulersByMedical(date),
      enabled: !!date,
    })),
  });

  const allDailyEvents: MyEvent[] = dailyResults
  .flatMap((result) => result.data ? ApiSchedulingPresenter(result.data) : []);

  const loadingDates = new Set(
    dailyResults
      .map((result, i) => result.isLoading ? expandedDates[i] : null)
      .filter((date): date is string => date !== null)
  );

  const events: MyEvent[] = [...allDailyEvents];

  function isValidQueueType(value: string): value is QueueType {
    return ['normal', 'priority', 'special', 'urgent'].includes(value);
  }

  if (Array.isArray(overviewData)) {
    let idxCounter = 0;

    overviewData.forEach((item) => {
      const isExpanded = expandedDates.includes(item.date);
      if (isExpanded) { 
        return;
      }

      const queueType = item.representative.queueType;
      const statusInfo = isValidQueueType(queueType)
        ? queueMap[queueType]
        : queueMap['normal'];

      for (let i = 0; i < item.count; i++) {
        events.push({
          id: `overview-${idxCounter++}`,
          name: item.representative.patientName,
          start: dayjs(item.date).toDate(),
          end: dayjs(item.date).toDate(),
          procedure: 'Consulta',
          allDay: false,
          modality: item.representative.modality === 'in_person' ? 'presencial' : 'telemedicina',
          status: statusInfo.status,
          statusLabel: statusInfo.label,
          statusLegend: statusInfo.legend,
          paid: false,
          situation: 'appoimented',
        } satisfies MyEvent);
      }
    });

    expandedDates.forEach((date) => {
      const hasEventsForDate = events.some(
        (e) => dayjs(e.start).format('YYYY-MM-DD') === date
      );

      if (!hasEventsForDate) {
        events.push({
          id: `loading-${date}`,
          name: '',
          start: dayjs(date).toDate(),
          end: dayjs(date).toDate(),
          procedure: '',
          allDay: false,
          modality: 'presencial',
          status: 'emerald',
          statusLabel: '',
          statusLegend: '',
          paid: false,
          situation: 'appoimented',
        } as MyEvent);
      }
    });

    events.sort((a, b) => a.start.getTime() - b.start.getTime());
  }

  useEffect(() => {
    console.log('isLoadingOverview', isLoadingOverview);
  }, [isLoadingOverview]);

  return (
    <Template>
      <SchedulerComponent.Root
          events={events}
          onExpandDay={handleExpandDay}
          loadingDates={loadingDates}
          renderEvent={(event) => (
            <SchedulerComponent.Event
              title={
              <>
                <div className="mr-3 w-22 gap-2 inline-flex">
                  <SchedulerComponent.Pill
                    label={event.modality == 'presencial' ? 'Presencial' : 'Telemedicina'}
                    variant="smooth"
                    status={event.modality == 'presencial' ? 'purple' : 'orange'}
                    className='w-full text-center'
                  />
                </div>
                {event.name}
                {!viewer[1] && (
                  <span className="text-xs text-slate-500"> - {event.procedure}</span>
                )}
                {event.paid && (
                  <SchedulerComponent.Pill
                    label='Pago'
                    variant="smooth"
                    status='emerald'
                    className='ml-2 text-center'
                  />
                )}
              </>}
              start={event.start}
              end={event.end}
              status={event.status}
              statusLabel={event.statusLabel}
              statusLegend={event.statusLegend}
            >
              {viewer[1] && (
                <span className="text-xs text-slate-500">{event.procedure}</span>
              )}
              <div className="flex flex-col gap-0.5">
                <SchedulerComponent.Pill
                  label={situationMap[event.situation]}
                  variant="smooth"
                  status={situationColorMap[event.situation]}
                  className='w-full text-center'
                />
              </div>
            </SchedulerComponent.Event>
          )}
        />
    </Template>
  );
}
