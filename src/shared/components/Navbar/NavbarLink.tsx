import { Link, useLocation } from 'react-router-dom';
import type { ButtonConfigProps } from '@/shared/components/Button/config/button.config';
import type { ReactNode } from 'react';
import { Button } from '../Button/Button';

interface NavbarLinkProps extends ButtonConfigProps {
	to: string;
	children: ReactNode;
	exact?: boolean;
}

export function NavbarLink({
	children,
	to,
	color = 'primary',
	variant = 'text',
	size = 'medium',
	corner = 'rounded',
	exact = false,
}: NavbarLinkProps) {
	const { pathname } = useLocation();
	const isActive = exact ? pathname === to : pathname.startsWith(to);

	return (
		<Button.Root
			asChild
			variant={variant}
			color={color}
			size={size}
			corner={corner}
			actived={isActive}
			className='w-full justify-start'
		>
			<Link to={to} className='flex items-center gap-2'>
				{children}
			</Link>
		</Button.Root>
	);
}
