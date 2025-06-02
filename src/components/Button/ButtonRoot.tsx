import clsx from 'clsx';
import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { ButtonLoading } from './ButtonLoading';

type ButtonVariant = 'text' | 'outlined' | 'contained';
type ButtonSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
type ButtonColor = 'primary' | 'green' | 'red' | 'lilac' | 'pink' | 'slate' | 'grey' | 'lemon';
type Corner = 'square' | 'soft' | 'rounded' | 'pill';

interface BaseProps {
  children?: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  corner?: Corner;
  disabled?: boolean;
  loading?: boolean;
}

type ButtonAsButton = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsAnchor = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function ButtonRoot({
  children,
  className,
  variant = 'contained',
  size = 'medium',
  color = 'primary',
  corner = 'rounded',
  loading = false,
  disabled,
  href,
  ...rest
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center leading-none font-medium relative cursor-pointer transition overflow-hidden group';

  const variantClasses = {
    contained: {
      primary: 'bg-primary-500 text-white',
      green: 'bg-fb-green-400 text-white',
      red: 'bg-fb-red-500 text-white',
      lilac: 'bg-fb-lilac-500 text-white',
      pink: 'bg-fb-pink-500 text-white',
      slate: 'bg-fb-slate-500 text-white',
      grey: 'bg-fb-grey-500 text-white',
      lemon: 'bg-fb-lemon-500 text-white',
    },
    outlined: {
      primary: 'border border-primary-200 text-primary-500',
      green: 'border border-fb-green-200 text-fb-green-700',
      red: 'border border-fb-red-200 text-fb-red-500',
      lilac: 'border border-fb-lilac-200 text-fb-lilac-500',
      pink: 'border border-fb-pink-200 text-fb-pink-500',
      slate: 'border border-fb-slate-200 text-fb-slate-700',
      grey: 'border border-fb-grey-200 text-fb-grey-700',
      lemon: 'border border-fb-lemon-200 text-fb-lemon-700',
    },
    text: {
      primary: 'text-primary-500 hover:underline',
      green: 'text-fb-green-700 hover:underline',
      red: 'text-fb-red-500 hover:underline',
      lilac: 'text-fb-lilac-500 hover:underline',
      pink: 'text-fb-pink-500 hover:underline',
      slate: 'text-fb-slate-700 hover:underline',
      grey: 'text-fb-grey-700 hover:underline',
      lemon: 'text-fb-lemon-700 hover:underline',
    },
  };


  const rippleBgClasses: Record<ButtonColor, string> = {
    primary: 'bg-primary-500/20',
    green: 'bg-fb-green-400/20',
    red: 'bg-fb-red-500/20',
    lilac: 'bg-fb-lilac-500/20',
    pink: 'bg-fb-pink-500/20',
    slate: 'bg-fb-slate-500/20',
    grey: 'bg-fb-grey-500/20',
    lemon: 'bg-fb-lemon-500/20',
  };


  const sizeClasses = {
    xsmall: 'p-2 gap-2 text-xs',
    small: 'p-2.5 gap-2.5 text-sm',
    medium: 'p-3 gap-3 text-base',
    large: 'p-3.5 gap-3.5 text-lg',
    xlarge: 'p-4 gap-4 text-xl',
  };

  const cornerClasses = {
    square: 'rounded-none',
    soft: 'rounded-[2px]',
    rounded: 'rounded-[6px]',
    pill: 'rounded-full',
  };

  const isDisabled = disabled || loading;

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;

  const type: 'submit' | 'reset' | 'button' | undefined =
    !href ? buttonProps.type ?? 'button' : undefined;

  const classes = clsx(
    baseClasses,
    variantClasses[variant][color],
    sizeClasses[size],
    cornerClasses[corner],
    isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  );

  const rippleSpan =
    variant !== 'text' ? (
      <span
        className={clsx(
          'absolute left-0 aspect-square rounded-full translate-x-[-50%] translate-y-[25%] z-0 group-hover:animate-load-mp',
          variant === 'contained' ? 'bg-black/20' : rippleBgClasses[color]
        )}
        style={{ animationDuration: '150ms' }}
      />
    ) : null;

  const content = (
    <>
      {rippleSpan}
      {loading && <ButtonLoading />}
      <span className="relative z-1 flex items-center gap-1">{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        {...anchorProps}
        href={href}
        className={classes}
        aria-disabled={isDisabled}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-busy={loading}
    >
      {content}
    </button>
  );
}
