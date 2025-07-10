import clsx from 'clsx';
import { Button } from '@/components/Button/Button';
import { Navbar } from '@/components/Navbar/Navbar';
import { useViewport } from '@/utils/ViewportBool';
import { useQuery } from '@tanstack/react-query';
import { FetchSchedulersByMedical } from '@/services/medical/fetch-schedulers-by-medical';
import type { ReactNode } from 'react';

interface ITemplateProps {
  children: ReactNode
}

export function Template({ children }: ITemplateProps) {

  const { viewer } = useViewport(900, 1240);

  return (
    <div
      className={
        clsx('w-dvw h-auto bg-slate-50',
          viewer[1]
            ? 'flex flex-col py-5 min-h-screen'
          : viewer[0]
            ? 'grid grid-cols-[65px_1fr] h-screen grid-rows-1'
            : 'grid grid-cols-[minmax(0,240px)_1fr] h-screen ')}>
      <Navbar.Root />
      <div className={clsx('flex flex-col', viewer[0] ? 'm-1 mx-4' : 'm-3 overflow-hidden')}>
        {children}
      </div>
    </div>
  );
}
