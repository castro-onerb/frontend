import clsx from 'clsx';
import { Button } from '@/components/Button/Button';
import type { MyEvent } from '@/components/CalendarScheduling/Card/CardRoot';
import { Navbar } from '@/components/Navbar/Navbar';
import { Scheduler } from '@/components/Scheduler/Scheduler';
import { useViewport } from '@/utils/ViewportBool';

const procedures = [
  'Ultrassonografia abdominal',
  'Ultrassonografia obstétrica',
  'Ultrassonografia pélvica',
  'Doppler de membros inferiores',
  'Doppler de membros superiores',
  'Ultrassonografia de tireoide',
  'Ultrassonografia renal',
  'Doppler carotídeo',
];

const events: MyEvent[] = [
  ...generateMassiveDayEvents(new Date(2025, 5, 3), 50),
  ...generateMassiveDayEvents(new Date(2025, 5, 8), 50),
];

function generateMassiveDayEvents(date: Date, count: number): MyEvent[] {
  const events: MyEvent[] = [];

  for (let i = 0; i < count; i++) {
    const procedure = procedures[i % procedures.length];
    const duration = [15, 20, 25, 30][i % 4];

    const start = new Date(date);
    start.setHours(8 + Math.floor((i * duration) / 60));
    start.setMinutes((i * duration) % 60);

    const end = new Date(start.getTime() + duration * 60000);

    const statuses = ['red', 'purple', 'emerald', 'pink'] as const;
    const statusName = ['Urgência', 'P. Especial', 'Normal', 'Prioridade'] as const;
    const statusLegend = ['Atendimento urgente', 'Atendimento com prioridade especial', 'Atendimento normal', 'Atendimento com prioridade'] as const;

    events.push({
      id: `day-${date.getDate()}-event-${i}`,
      name: `Nome completo do paciente ${i + 1}`,
      start,
      end,
      allDay: false,
      status: statuses[i % statuses.length],
      statusLabel: statusName[i % statuses.length],
      statusLegend: statusLegend[i % statuses.length],
      modality: i % 3 === 0 ? 'telemedicina' : 'presencial',
      procedure,
    });
  }

  return events;
}

export function Template() {

  const { viewer } = useViewport(900, 1240);

  return (
    <div
      className={
        clsx('w-dvw h-auto bg-slate-50',
          viewer[1]
            ? 'flex flex-col py-5 min-h-screen'
          : viewer[0]
            ? 'grid grid-cols-[65px_1fr] h-screen grid-rows-1'
            : 'grid grid-cols-[minmax(0,240px)_1fr] h-screen ')}>
      <Navbar.Root />
      <div className={clsx('flex flex-col', viewer[0] ? 'm-1 mx-4' : 'm-3 overflow-hidden')}>
        <Scheduler.Root
          events={events}
          renderEvent={(event) => (
            <Scheduler.Event
              title={
              <>{event.name}
                {!viewer[1] && (
                  <span className="text-xs text-slate-500"> - {event.procedure}</span>
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
                <Scheduler.Pill
                  label={event.modality === 'telemedicina' ? 'Telemedicina' : 'Presencial'}
                  variant="smooth"
                  status={event.modality === 'telemedicina' ? 'orange' : 'emerald'}
                />
              </div>
            </Scheduler.Event>
          )}
        />
      </div>
      <Button.Root
        className='fixed right-5 bottom-5 shadow-lg'
        corner='pill'
        size='medium'
        color='lemon'>
        <Button.Text>Iniciar atendimento</Button.Text>
      </Button.Root>
    </div>
  );
}
