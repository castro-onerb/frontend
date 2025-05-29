import type { ReactNode } from 'react';

interface IFilterRootProps {
  children?: ReactNode
}

export function FilterRoot({ children }: IFilterRootProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl">{children}</div>
  );
}
