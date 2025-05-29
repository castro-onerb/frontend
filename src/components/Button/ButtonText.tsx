import type { ReactNode } from 'react';

interface IButtonTextProps {
  children: ReactNode;
}

export function ButtonText({ children }: IButtonTextProps) {
  return (
    <span className="z-10 font-semibold leading-none">{children}</span>
  );
}
