import clsx from 'clsx';
import { CardType } from './@types/calendar-types';

type PillSize = 'xsmall' | 'small' | 'medium' | 'large';

interface CalendarPillProps {
  label: string;
  type: CardType;
  size?: PillSize;
  className?: string;
}

export function CalendarPill({
  label,
  type,
  size = 'small',
  className,
}: CalendarPillProps) {
  const variantClasses: Record<CardType, string> = {
    [CardType.Red]: 'bg-red-700 text-white',
    [CardType.Purple]: 'bg-purple-700 text-white',
    [CardType.Pink]: 'bg-pink-700 text-white',
    [CardType.Emerald]: 'bg-emerald-700 text-white',
    [CardType.Slate]: 'bg-slate-700 text-white',
  };

  const sizeClasses: Record<PillSize, string> = {
    xsmall: 'text-[10px] px-1.5 py-0.5',
    small: 'text-[12px] px-2 py-0.5',
    medium: 'text-[14px] px-2.5 py-1',
    large: 'text-[16px] px-3 py-1.5',
  };

  const variantClass = variantClasses[type] ?? 'border-gray-400 bg-gray-50 text-gray-800';

  return (
    <span
      className={clsx(
        'w-fit font-medium leading-none m-0 rounded-full',
        variantClass,
        sizeClasses[size],
        className
      )}
    >
      {label}
    </span>
  );
}
