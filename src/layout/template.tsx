import { Button } from '@/components/Button/Button';
import { Calendar } from '@/components/CalendarScheduling/Calendar';
import type { MyEvent } from '@/components/CalendarScheduling/Card/CardRoot';
import { Filter } from '@/components/CalendarScheduling/Filter';
import { Input } from '@/components/Input/Input';

const events: MyEvent[] = [
  {
    id: 1,
    title: 'Danilo Vargas Oliveira',
    start: new Date(Date.now() - 1000 * 60 * 5),
    end: new Date(Date.now() + 1000 * 60 * 40),
    allDay: false,
    resource: { paciente: 'Maria', tipo: 'Retorno' },
  },{
    id: 2,
    title: 'Antônio Carlos da Silva',
    start: new Date(2025, 5, 2, 16, 30),
    end: new Date(2025, 5, 2, 17, 59),
    allDay: false,
    resource: { paciente: 'Maria', tipo: 'Retorno' },
  },
];

export function Template() {

  return (
    <div className="w-dvw h-dvh p-6 gap-3 grid grid-cols-[auto_1fr] grid-rows-1">
      <Filter.Root>
        <Filter.Header>
          <p className='text-base font-bold text-slate-500'>Filtros do Calendário</p>
        </Filter.Header>
        <div className="p-3 flex flex-col gap-3">
          <div className="flex gap-1.5">
            <Input.Root>
              <Input.Field
                color='slate'
                placeholder='Buscar paciente'></Input.Field>
            </Input.Root>
            <Button.Root
              color='slate'
              size='medium'>
              <Button.Text>Buscar</Button.Text>
            </Button.Root>
          </div>
        </div>
      </Filter.Root>
      <div className="border border-slate-200 rounded-xl flex overflow-hidden">
        <Calendar.Root events={events} />
      </div>
    </div>
  );
}
