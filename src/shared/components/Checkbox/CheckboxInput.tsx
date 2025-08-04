import clsx from 'clsx';
import { useCheckboxContext } from './CheckboxContext';
import type { InputHTMLAttributes } from 'react';

type CheckboxColor =
  | 'primary' | 'green' | 'red' | 'lilac' | 'pink' | 'slate' | 'grey' | 'lemon';

interface CheckboxInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  color?: CheckboxColor;
}

const colorClasses: Record<CheckboxColor, string> = {
  primary: 'border-primary-500 hover:border-primary-700 checked:bg-primary-500 checked:border-primary-500',
  green: 'border-fb-green-500 hover:border-fb-green-700 checked:bg-fb-green-500 checked:border-fb-green-500',
  red: 'border-fb-red-500 hover:border-fb-red-700 checked:bg-fb-red-500 checked:border-fb-red-500',
  lilac: 'border-fb-lilac-500 hover:border-fb-lilac-700 checked:bg-fb-lilac-500 checked:border-fb-lilac-500',
  pink: 'border-fb-pink-500 hover:border-fb-pink-700 checked:bg-fb-pink-500 checked:border-fb-pink-500',
  slate: 'border-fb-slate-500 hover:border-fb-slate-700 checked:bg-fb-slate-500 checked:border-fb-slate-500',
  grey: 'border-fb-grey-500 hover:border-fb-grey-700 checked:bg-fb-grey-500 checked:border-fb-grey-500',
  lemon: 'border-fb-lemon-500 hover:border-fb-lemon-700 checked:bg-fb-lemon-500 checked:border-fb-lemon-500',
};

export function CheckboxInput({
  className,
  color = 'primary',
  ...props
}: CheckboxInputProps) {
  const { id, disabled } = useCheckboxContext();

  return (
    <input
      id={id}
      type="checkbox"
      disabled={disabled}
      className={clsx(
        'w-5 h-5 appearance-none border rounded transition duration-200',
        'checked:after:content-["✓"] checked:after:text-white checked:border-2 checked:after:flex checked:after:justify-center checked:after:items-center',
        'after:text-sm after:font-bold after:leading-none cursor-pointer',
        colorClasses[color],
        disabled && 'opacity-50 pointer-events-none',
        className
      )}
      {...props}
    />
  );
}
