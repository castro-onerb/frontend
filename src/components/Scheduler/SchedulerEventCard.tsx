import { Button } from '../Button/Button';
import { Dropdown } from '../Dropdown/Dropdown';
import { Icon } from '../Icon/Icon';

export function SchedulerEventCard() {
  return (
    <Dropdown.Content className='flex flex-col mx-4'>
      <div className="p-4 sm:p-6 border-b border-slate-100">
        <p className='text-slate-600 font-bold text-base sm:text-lg'>Antônio Carlos da Silva</p>
        <div className="flex justify-between gap-5 md:gap-28">
          <span className='text-slate-500 text-sm'>20/07/1968 - Masculino</span>
          <span className='text-slate-500 text-sm'>#101541-6</span>
        </div>
      </div>
      <div className="p-4 sm:p-6 flex flex-col gap-3">
        <div className="">
          <p className='text-slate-600 font-medium'>Convênio Deovita</p>
        </div>
        <div className="p-1.5 border border-slate-200 rounded-xl">
          <p>Sem observação</p>
        </div>
        <div className="">
          <p className='text-slate-600 text-sm'>Paciente aguardando a 10min</p>
        </div>
        <div className="flex gap-3 justify-end">
          <Button.Root
            size='small'
            variant='outlined'
            color='slate'>
            <Button.Text>Chamar</Button.Text>
            <Icon name='heart-hand' />
          </Button.Root>
          <Button.Root
            size='small'
            variant='outlined'
            color='slate'>
            <Button.Text>Histórico</Button.Text>
            <Icon name='eye' />
          </Button.Root>
          <Button.Root
            size='small'
            variant='outlined'
            color='red'>
            <Button.Text>Faltou</Button.Text>
            <Icon name='close' />
          </Button.Root>
        </div>
      </div>
    </Dropdown.Content>
  );
}