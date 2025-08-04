import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import type { IconKey } from '../Icon/icon-reference';

type FlashVariant = 'success' | 'info' | 'alert' | 'error';

interface IFlashRootProps {
  children: ReactNode;
  className?: string;
  variant?: FlashVariant;
  onClose?: () => void;
}

const variantStyleMap: Record<
  FlashVariant,
  {
    bg: string;
    bubble: string;
    circle: string;
    icon: IconKey;
  }
> = {
  success: {
    bg: 'bg-primary-500 text-white',
    bubble: 'bg-primary-700',
    circle: 'bg-primary-700',
    icon: 'check',
  },
  info: {
    bg: 'bg-[#006fe0] text-white',
    bubble: 'bg-[#08468a]',
    circle: 'bg-[#08468a]',
    icon: 'check',
  },
  alert: {
    bg: 'bg-[#ee8d31] text-white',
    bubble: 'bg-[#ce5718]',
    circle: 'bg-[#ce5718]',
    icon: 'exclamation',
  },
  error: {
    bg: 'bg-[#C82C41] text-white',
    bubble: 'bg-[#811336]',
    circle: 'bg-[#811336]',
    icon: 'close',
  },
};

export function FlashRoot({
  children,
  className = '',
  variant = 'info',
  onClose
}: IFlashRootProps) {

	const { bg, bubble, circle, icon } = variantStyleMap[variant];

  return (
		<div className={clsx('relative flex justify-between my-2 text-sm rounded-3xl w-full', bg, className)}>
			{/* Wrapper com overflow visível */}
				<div className="relative z-10 flex items-center">
					{/* Ícone flutuante com seta (fora da área escondida) */}
					<div className={clsx('relative translate-x-[20%] -translate-y-[70%] p-3 rounded-full z-20', bubble)}>
						<Icon name={icon} size={24} />
						<div className={clsx('absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-5 h-4 [clip-path:polygon(0_0,100%_0,70%_100%)]', bubble)} />
					</div>
				</div>
			<div
				className={clsx('relative flex overflow-hidden p-4 py-6 rounded-3xl')}
			>
				{/* Bolinha decorativa no canto (clipada pelo overflow-hidden) */}
				<div className={clsx('absolute bottom-[-10px] right-[-10px] w-16 h-16 rounded-full z-0', circle)} />
				<div className={clsx('absolute bottom-[30px] right-[40px] w-5 h-5 rounded-full z-0', circle)} />
				<div className={clsx('absolute bottom-[10px] right-[60px] w-3 h-3 rounded-full z-0', circle)} />

				{/* Conteúdo principal */}

				<div className="relative z-10 flex-1 flex flex-col gap-1">{children}</div>

				{onClose && (
					<span onClick={onClose} className="relative z-10 h-fit p-1 cursor-pointer">
						<Icon name="close" size={20} />
					</span>
				)}
			</div>
		</div>
	);

}
