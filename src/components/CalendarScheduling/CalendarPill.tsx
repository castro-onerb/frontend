import { CardType } from './@types/calendar-types';

interface CalendarPillProps {
  label: string;
  type: CardType;
}

export function CalendarPill({ label, type }: CalendarPillProps) {
  const variantClasses: Record<CardType, string> = {
    [CardType.Red]: 'bg-red-700 text-white',
    [CardType.Purple]: 'bg-purple-700 text-white',
    [CardType.Pink]: 'bg-pink-700 text-white',
    [CardType.Emerald]: 'bg-emerald-700 text-white',
  };

  const variantClass =
    variantClasses[type] ?? 'border-gray-400 bg-gray-50 text-gray-800';

  return (
    <span className={`w-fit text-[12px] font-medium leading-none m-0 p-1 px-2 bg- rounded-full ${variantClass}`}>
      {label}
    </span>
  );
}
