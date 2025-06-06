import clsx from 'clsx';
import type { ReactNode } from 'react';

interface IButtonTextProps {
  children: ReactNode;
  className?: string;
}

export function ButtonText({ children, className }: IButtonTextProps) {
  return (
    <span className={clsx('z-10 font-semibold leading-none flex items-center gap-2', className)}>{children}</span>
  );
}
