import dayjs from 'dayjs';
import { groupEventsByDay } from '@/utils/groupEventsByDay';
import clsx from 'clsx';
import { useState } from 'react';
import { useViewport } from '@/utils/ViewportBool';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface SchedulerProps<T extends { start: Date; end: Date; id: string }> {
  events: T[];
  renderEvent: (event: T) => React.ReactNode;
}

export function SchedulerRoot<T extends { start: Date; end: Date; id: string }>({
  events,
  renderEvent
}: SchedulerProps<T>) {
  const { viewer } = useViewport(900);

  const eventsByDay = groupEventsByDay(events);
  const [openDates, setOpenDates] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    Object.keys(eventsByDay).forEach(date => {
      if (dayjs(date).isSame(dayjs(), 'day')) {
        initial[date] = true; // dia atual aberto
      }
    });
    return initial;
  });

  const toggleDate = (date: string) => {
    setOpenDates(prev => ({
      ...prev,
      [date]: !prev[date]
    }));
  };

  return (
    <div className={clsx('flex flex-col gap-4 p-1 flex-1', !viewer[0] && 'bg-white rounded-3xl overflow-y-auto p-3')}>
      {!viewer[0] && (
      <div className='flex items-center gap-5 bg-slate-50 rounded-xl px-4 py-2'>
        <Tooltip>
          <TooltipTrigger>
            <span className='flex items-center gap-2'><span className={clsx('p-1.5 rounded-full bg-red-500')} /> Urgência</span>
          </TooltipTrigger>
          <TooltipContent>
            Paciente com saúde crítica.
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <span className='flex items-center gap-2'><span className={clsx('p-1.5 rounded-full bg-purple-500')} /> Prioridade especial</span>
          </TooltipTrigger>
          <TooltipContent>
            Pacientes acima de 80 anos.
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <span className='flex items-center gap-2'><span className={clsx('p-1.5 rounded-full bg-pink-500')} /> Prioridade</span>
          </TooltipTrigger>
          <TooltipContent>
            Pacientes acima de 60 anos e/ou necessidades especiais.
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <span className='flex items-center gap-2'><span className={clsx('p-1.5 rounded-full bg-emerald-500')} /> Normal</span>
          </TooltipTrigger>
          <TooltipContent>
            Pacientes gerais.
          </TooltipContent>
        </Tooltip>
      </div>
      )}

      {Object.entries(eventsByDay).map(([date, dailyEvents]) => {
        const dateObj = dayjs(date);
        const dayNumber = dateObj.format('D');
        const isToday = dateObj.isSame(dayjs(), 'day');
        const isOpen = openDates[date];
        const dayLabel = dateObj.format('MMM - ddd').toUpperCase();

        return (
          <div key={date} className={clsx('flex items-start p-1 border-b border-slate-200', viewer[0] ? 'gap-1' : 'gap-4')}>
            {/* Esquerda: Data (botão de expandir/fechar) */}
            <button
              onClick={() => toggleDate(date)}
              className={clsx(
                'top-0 sticky w-9 aspect-square py-1 rounded-full flex items-center gap-1 justify-center text-lg font-semibold cursor-pointer transition border-none',
                isToday ? 'bg-primary-500 text-white' : 'bg-transparent text-slate-700 hover:bg-slate-100'
              )}
            >
              <span>{dayNumber}</span>
            </button>

            {!viewer[0] && (
              <span className='top-2 sticky text-sm w-[75px] mt-2'>{dayLabel}</span>
            )}

            {/* Direita: Eventos */}
            <div className="flex-1 flex flex-col gap-2 items-stretch">
              {(isOpen ? dailyEvents : [dailyEvents[0]]).map(event => (
                <div key={event.id}>{renderEvent(event)}</div>
              ))}

              {/* Botão "ver mais" se tiver mais de 1 evento */}
              {!isOpen && dailyEvents.length > 1 && (
                <button
                  onClick={() => toggleDate(date)}
                  className="text-xs text-primary-500 hover:underline self-start ml-1 cursor-pointer"
                >
                  + {dailyEvents.length - 1 == 1 ? '1 agendamento' : dailyEvents.length - 1 + ' agendamentos'}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
