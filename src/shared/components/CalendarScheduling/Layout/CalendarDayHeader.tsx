import { Button } from '@/shared/components/Button/Button';

export function CalendarDayHeader() {
  return (
    <div className="flex flex-col">
      <span>Seg</span>
      <Button.Root>02</Button.Root>
    </div>
  );
}
