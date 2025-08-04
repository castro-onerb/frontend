import type { ReactNode } from 'react';
import { useCheckboxContext } from './CheckboxContext';

interface CheckboxLabelProps {
  children: ReactNode;
  className?: string;
}

export function CheckboxLabel({ children, className }: CheckboxLabelProps) {
  const { id, disabled } = useCheckboxContext();

  return (
    <label
      htmlFor={id}
      className={`text-base text-slate-700 leading-none cursor-pointer ${disabled ? 'opacity-50' : ''} ${className || ''}`}
    >
      {children}
    </label>
  );
}
