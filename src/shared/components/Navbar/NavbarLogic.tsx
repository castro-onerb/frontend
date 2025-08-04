import clsx from 'clsx';
import { useMemo } from 'react';
import { useViewport } from '@/shared/utils/viewport-bool';
import { useNavbar } from './hooks/useNavbar';

interface DeviceConfig {
  view: 'mobile' | 'tablet' | 'default';
  enabled?: boolean;
  force?: boolean;
  context?: string;
  className?: string;
}

interface NavbarLogicProps {
  devices?: DeviceConfig[];
  className?: string;
  contextKey?: string;
}

export function NavbarLogic({
  devices,
  className,
  contextKey = 'default',
}: NavbarLogicProps) {
  const { mobile, tablet } = useViewport();

  const selected = useMemo(() => {
    if (!devices || devices.length === 0) {
      return { view: 'default', context: contextKey, className };
    }

    const match = {
      mobile: devices.find((d) => d.view === 'mobile'),
      tablet: devices.find((d) => d.view === 'tablet'),
      default: devices.find((d) => d.view === 'default'),
    };

    if (match.mobile?.force && match.mobile.enabled) return match.mobile;
    if (match.tablet?.force && match.tablet.enabled) return match.tablet;
    if (match.default?.force && match.default.enabled) return match.default;

    if (match.mobile?.enabled && mobile) return match.mobile;
    if (match.tablet?.enabled && tablet) return match.tablet;
    if (match.default?.enabled && !tablet) return match.default;

    return undefined;
  }, [devices, mobile, tablet, contextKey, className]);

  const context = selected?.context ?? contextKey;
  const { actions } = useNavbar(context);

  if (!selected) return null;

  return (
    <div className={clsx(className, selected.className)}>
      {actions.map((action, i) => (
        <div key={`btn-context-${i}`} className='flex items-stretch flex-0'>
          {action}
        </div>
      ))}
    </div>
  );
}
