import clsx from 'clsx';
import { useNavbar } from '../hooks/useNavbar';

export function NavbarMobile({
	contextKey = 'default',
	className
}: {
	contextKey?: string;
	className?: string;
}) {
	const { title, actions } = useNavbar(contextKey);

	return (
		<div className={clsx('z-50 p-3 shadow-2xl rounded-2xl flex flex-col gap-1 bg-white', className)}>
			{title && <p className='text-sm font-medium text-slate-400'>{title}</p>}
			<div className='flex gap-2'>
				{actions.map((actions, i) => (
					<div key={`btn-context-${i}`} className='flex items-stretch flex-0'>
						{actions}
					</div>
				))}
			</div>
		</div>
	);
}
