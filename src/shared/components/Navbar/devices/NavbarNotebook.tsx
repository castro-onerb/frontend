import { Dropdown } from '../../Dropdown/Dropdown';
import { Logo } from '../../Logomark/Logo';
import { Profile } from '../../Profiles/Profile';
import defaultUser from '@/assets/img/user-default.svg';
import { useAuthUser } from '@/shared/auth/hooks/useAuthUser';
import { useNavbar } from '../hooks/useNavbar';
import { useLogout } from '@/shared/hooks/logout/useLogout';
import clsx from 'clsx';

export function NavbarNotebook({
	contextKey = 'default',
	className,
}: {
	contextKey?: string;
	className?: string;
}) {
	const { logout } = useLogout();
	const user = useAuthUser();
	const { actions } = useNavbar(contextKey);

	return (
		<div className={clsx('p-4 py-5 flex-1 flex flex-col gap-6 items-stretch bg-white border-r-2 border-slate-100', className)}>
			<div className='flex flex-col justify-between flex-1 gap-5'>
				<Logo.Dinamic
					devices={[{ view: 'default', force: true, enabled: true }]}
					className='h-[40px] self-start'
				/>
				<div className='flex-1 flex flex-col gap-2 overflow-y-auto'>
					{actions.map((action, i) => (
						<div key={`btn-context-${i}`} className='flex items-stretch flex-0'>
							{action}
						</div>
					))}
				</div>
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
					<Profile.Root photo={<Profile.Photo src={defaultUser} />}>
						<Profile.Name value={user!.name} />
						<Profile.Legend value={user!.role} />
					</Profile.Root>
				</Dropdown.Root>
			</div>
		</div>
	);
}
