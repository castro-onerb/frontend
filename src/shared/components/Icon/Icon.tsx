import { Icon as IconifyIcon } from '@iconify/react';
import type { ComponentProps } from 'react';
import { IconReference, type IconKey } from './icon-reference';

interface IconProps extends Omit<ComponentProps<typeof IconifyIcon>, 'icon'> {
  name: IconKey;
  size?: number;
}

export function Icon({ name, size = 16, ...props }: IconProps) {
  return (
    <IconifyIcon
      icon={IconReference[name]}
      width={size}
      height={size}
      {...props}
    />
  );
}
