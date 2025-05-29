import { Button } from '@/components/Button/Button';
import { Calendar } from '@/components/CalendarScheduling/Calendar';
import { Filter } from '@/components/CalendarScheduling/Filter';
import { Checkbox } from '@/components/Checkbox/Checkbox';
import { Icon } from '@/components/Icon/Icon';
import { Input } from '@/components/Input/Input';

export function Template() {
  return (
    <div className="w-dvw h-dvh p-6 gap-3 bg-white grid grid-cols-[auto_1fr]">
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
          <div className="">
            <Filter.Session
              title='Tipo urgência'>
              <Checkbox.Root id="normal">
                <Checkbox.Input
                  color='slate' />
                <Checkbox.Label>Normal</Checkbox.Label>
              </Checkbox.Root>
              <Checkbox.Root id="special">
                <Checkbox.Input
                  color='slate' />
                <Checkbox.Label>Prioridade normal</Checkbox.Label>
              </Checkbox.Root>
              <Checkbox.Root id="priority">
                <Checkbox.Input
                  color='slate' />
                <Checkbox.Label>Prioridade</Checkbox.Label>
              </Checkbox.Root>
              <Checkbox.Root id="urgency">
                <Checkbox.Input
                  color='slate' />
                <Checkbox.Label>Urgência</Checkbox.Label>
              </Checkbox.Root>
            </Filter.Session>
          </div>
        </div>
      </Filter.Root>
      <Calendar.Root>
        <Calendar.Header>
          <div className="flex justify-between flex-1">
            <div className="flex gap-3">
              <Button.Root
                variant='outlined'
                color='grey'
                size='large'>
                <Button.Text>Maio - 2025</Button.Text>
              </Button.Root>
              <Button.Root
                variant='outlined'
                color='grey'
                size='large'>
                <Button.Text>01/05 - 07-05</Button.Text>
              </Button.Root>
              <Button.Root>
                <Button.Text>Hoje</Button.Text>
              </Button.Root>
            </div>
            <div className="flex gap-3">
              <Button.Root
                color='lemon'
                corner='pill'
                size='large'>
                <Button.Text>Chamar próximo paciente</Button.Text>
              </Button.Root>
              <Button.Root
                variant='outlined'
                color='grey'
                size='large'>
                <Icon name='chart-line' />
                <Button.Text>Financeiro</Button.Text>
              </Button.Root>
            </div>
          </div>
        </Calendar.Header>
      </Calendar.Root>
    </div>
  );
}
