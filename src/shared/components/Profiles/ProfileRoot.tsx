import clsx from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

interface IProfileRootProps extends HTMLAttributes<HTMLDivElement> {
	photo?: ReactNode;
	children?: ReactNode;
	className?: string;
}

export function ProfileRoot({
	photo,
	children,
	className,
	...props
}: IProfileRootProps) {
	return (
		<div className={clsx('relative flex gap-3', className)} {...props}>
			{photo}
			{children && <div className='flex flex-col gap-1'>{children}</div>}
		</div>
	);
}
