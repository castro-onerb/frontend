import { useState } from 'react';
import { Logo } from '../../Logomark/Logo';
import { Icon } from '../../Icon/Icon';
import { NavbarNotebook } from './NavbarNotebook';
import { Profile } from '../../Profiles/Profile';
import defaultUser from '@/assets/img/user-default.svg';
import { useNavbar } from '../hooks/useNavbar';
import { useLogout } from '@/shared/hooks/logout/useLogout';
import { Dropdown } from '../../Dropdown/Dropdown';
import clsx from 'clsx';

export function NavbarTablet({
	contextKey = 'default',
	className
}: {
	contextKey?: string;
	className?: string;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const { logout } = useLogout();
	const { actions } = useNavbar(contextKey);

	const handleOpenNavbar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={clsx('p-2 py-5 flex-1 flex flex-col gap-6 items-stretch bg-white relative', className)}>
			<div
				className='w-7 h-7 flex items-center justify-center text-primary-500 hover:text-primary-700 rounded-full bg-white shadow-lg hover:shadow-sm border border-neutral-200 absolute top-16 -right-3 cursor-pointer transition'
				onClick={handleOpenNavbar}
			>
				<Icon name='chevron-right' />
			</div>
			<div className='flex-1 flex flex-col justify-between gap-3'>
				<Logo.Dinamic className='h-[40px]' />
				<div className='flex-1 flex flex-col gap-2 overflow-y-auto'>
					{actions.map((action, i) => (
						<div key={`btn-context-${i}`} className='flex items-stretch flex-0'>
							{action}
						</div>
					))}
				</div>
				<div>
					<Dropdown.Root
						placement='bottom-end'
						dropdown={
							<div className='bg-white rounded-xl shadow-xl p-1.5 min-w-[150px]'>
								<button className='p-2 px-3 cursor-pointer rounded-lg block w-full text-left hover:bg-gray-100'>
									Preferências
								</button>
								<button
									onClick={() => void logout()}
									className='text-red-500 p-2 px-3 cursor-pointer rounded-lg block w-full text-left hover:bg-gray-100'
								>
									Sair
								</button>
							</div>
						}
					>
						<Profile.Root
							photo={<Profile.Photo src={defaultUser} />}
						></Profile.Root>
					</Dropdown.Root>
				</div>
			</div>
			{isOpen && (
				<div
					className='fixed inset-0 flex bg-black/50 z-10 cursor-pointer'
					onClick={(e) =>
						e.target === e.currentTarget ? handleOpenNavbar() : false
					}
				>
					<NavbarNotebook />
				</div>
			)}
		</div>
	);
}
