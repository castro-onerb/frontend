import type { ReactNode } from 'react';
import clsx from 'clsx';
import { badgeConfig, type BadgeConfigProps } from './config/badge.config';

interface IBadgeRootProps extends BadgeConfigProps  {
	children: ReactNode;
	className?: string;
}

export function BadgeRoot({
  children,
  variant,
  color,
  size,
  corner,
  className,
}: IBadgeRootProps) {

	return (
		<div
			className={clsx(badgeConfig({ variant, color, size, corner }), className)}
		>
			{children}
		</div>
	);
}
