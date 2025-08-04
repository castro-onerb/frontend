import clsx, { type ClassValue } from 'clsx';
import { Slot } from '@radix-ui/react-slot';
import { useViewport } from '@/shared/utils/viewport-bool';
import type {
	ButtonHTMLAttributes,
	AnchorHTMLAttributes,
	ReactNode,
} from 'react';
import { buttonConfig, type ButtonConfigProps } from './config/button.config';

type DeviceProps = {
	devices?: {
		view: 'mobile' | 'tablet' | 'default';
		force?: boolean;
		enabled?: boolean;
	}[];
};

type NativeElementProps = ButtonHTMLAttributes<HTMLButtonElement> &
	AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = {
	asChild?: boolean;
	children?: ReactNode;
	className?: ClassValue;
	loading?: boolean;
	disabled?: boolean;
	href?: string;
} & ButtonConfigProps &
	DeviceProps &
	Omit<NativeElementProps, keyof ButtonConfigProps | 'href'>;

export function ButtonRoot({
	asChild = false,
	children,
	className,
	variant = 'contained',
	size = 'medium',
	color = 'primary',
	corner = 'rounded',
	loading,
	disabled,
	actived,
	href,
	onClick,
	devices,
	...rest
}: ButtonProps) {
	const { mobile, tablet } = useViewport();
	const Comp = asChild ? Slot : href ? 'a' : 'button';

	const shouldRender = () => {
		if (!devices || devices.length === 0) return true;
		const match = {
			mobile: devices.find((d) => d.view === 'mobile'),
			tablet: devices.find((d) => d.view === 'tablet'),
			default: devices.find((d) => d.view === 'default'),
		};

		// Forçados
		if (match.mobile?.force && match.mobile.enabled) return true;
		if (match.tablet?.force && match.tablet.enabled) return true;
		if (match.default?.force && match.default.enabled) return true;

		// Viewport match
		if (match.mobile?.enabled && mobile) return true;
		if (match.tablet?.enabled && tablet) return true;
		if (match.default?.enabled && !tablet) return true;

		return false;
	};

	if (!shouldRender()) return null;

	const classes = buttonConfig({
		variant,
		color,
		size,
		corner,
		disabled,
		actived,
		className,
	});

	const ripple =
		variant !== 'link' ? (
			<span
				className={clsx(
					'absolute left-0 aspect-square rounded-full translate-x-[-50%] -translate-y-[25%] z-0 group-hover:animate-load-mp',
					variant === 'contained' ? 'bg-black/20' : `${color}/20`,
				)}
				style={{ animationDuration: '300ms' }}
			/>
		) : null;

	const content = (
		<div className={clsx('relative flex items-center gap-2 w-full')}>
			{ripple}
			{loading && <span className='loader'></span>}
			<span className='relative z-1 flex items-center gap-1 justify-between flex-1'>
				{children}
			</span>
		</div>
	);

	return (
		<Comp
			{...rest}
			href={href}
			onClick={onClick}
			type={
				!href
					? ((rest as ButtonHTMLAttributes<HTMLButtonElement>)?.type ??
						'button')
					: undefined
			}
			className={classes}
			disabled={disabled}
			aria-disabled={disabled}
			aria-busy={loading}
		>
			{content}
		</Comp>
	);
}
