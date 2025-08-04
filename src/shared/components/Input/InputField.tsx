import clsx from 'clsx';
import type { InputHTMLAttributes, ReactNode } from 'react';

type InputVariant = 'outlined' | 'contained'; // você pode adicionar 'text' se quiser futuramente
type InputColor =
  | 'primary'
  | 'green'
  | 'red'
  | 'lilac'
  | 'pink'
  | 'slate'
  | 'grey'
  | 'lemon';

interface IFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  children?: ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: InputVariant;
  color?: InputColor;
}

const variantClasses: Record<InputVariant, Record<InputColor, string>> = {
  contained: {
    primary: 'bg-primary-50 border-primary-300 focus-within:border-primary-500',
    green: 'bg-fb-green-50 border-fb-green-300 focus-within:border-fb-green-400',
    red: 'bg-fb-red-50 border-fb-red-300 focus-within:border-fb-red-500',
    lilac: 'bg-fb-lilac-50 border-fb-lilac-300 focus-within:border-fb-lilac-500',
    pink: 'bg-fb-pink-50 border-fb-pink-300 focus-within:border-fb-pink-500',
    slate: 'bg-fb-slate-50 border-fb-slate-300 focus-within:border-fb-slate-500',
    grey: 'bg-fb-grey-50 border-fb-grey-300 focus-within:border-fb-grey-500',
    lemon: 'bg-fb-lemon-50 border-fb-lemon-300 focus-within:border-fb-lemon-500',
  },
  outlined: {
    primary: 'border border-primary-300 focus-within:border-primary-500',
    green: 'border border-fb-green-300 focus-within:border-fb-green-400',
    red: 'border border-fb-red-300 focus-within:border-fb-red-500',
    lilac: 'border border-fb-lilac-300 focus-within:border-fb-lilac-500',
    pink: 'border border-fb-pink-300 focus-within:border-fb-pink-500',
    slate: 'border border-fb-slate-300 focus-within:border-fb-slate-500',
    grey: 'border border-fb-grey-300 focus-within:border-fb-grey-500',
    lemon: 'border border-fb-lemon-300 focus-within:border-fb-lemon-500',
  },
};

export function InputField({
  placeholder,
  children,
  value,
  onChange,
  variant = 'outlined',
  color = 'primary',
  className,
  disabled,
  ...props
}: IFieldProps) {
  const wrapperClasses = clsx(
    'flex items-center gap-2 rounded-lg transition w-auto',
    variantClasses[variant][color],
    disabled && 'opacity-50 pointer-events-none',
    className
  );

  return (
    <div className={wrapperClasses}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="text-base leading-none flex-1 p-2.5 outline-none bg-transparent w-full"
        {...props}
      />
      {children}
    </div>
  );
}
