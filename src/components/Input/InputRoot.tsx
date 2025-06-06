import clsx from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

interface IRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export function InputRoot({ children, className, ...props }: IRootProps) {
  return(
    <div {...props} className={clsx('flex flex-col gap-1', className)}>
      {children}
    </div>
  );
}
