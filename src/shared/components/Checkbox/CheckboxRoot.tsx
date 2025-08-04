import { CheckboxContext } from './CheckboxContext';
import type { InputHTMLAttributes, ReactNode } from 'react';

interface CheckboxRootProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  children: ReactNode;
}

export function CheckboxRoot({ children, id, disabled, ...props }: CheckboxRootProps) {
  return (
    <CheckboxContext.Provider value={{ id, disabled }}>
      <div className="inline-flex items-center gap-2" {...props}>
        {children}
      </div>
    </CheckboxContext.Provider>
  );
}
