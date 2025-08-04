import { useLogout } from '@/shared/hooks/logout/useLogout';
import { Button } from '../Button/Button';
import { Dropdown } from '../Dropdown/Dropdown';
import { Icon } from '../Icon/Icon';
import { Logo } from '../Logomark/Logo';
import { Profile } from './Profile';
import defaultUser from '@/assets/img/user-default.svg';
import { useAuthUser } from '@/shared/auth/hooks/useAuthUser';

export function ProfileApp() {
	const { logout } = useLogout();
	const user = useAuthUser();

	return (
		<div className='bg-white p-4 rounded-2xl m-1 shadow-lg flex justify-between items-center'>
			<div className='flex gap-3 items-center'>
				<div className='w-10 h-10'>
					<Logo.Dinamic />
				</div>
				<div className='flex flex-col gap-1'>
					<Profile.Name value={user!.name} />
					<Profile.Legend value={user!.role} />
				</div>
			</div>
			<div className='flex items-center gap-2'>
				<Button.Root variant='text' size='xsmall' corner='pill' color='slate'>
					<Icon name='bell:fill' size={20} />
				</Button.Root>
				<Dropdown.Root
					placement='top-end'
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
					<div className='relative'>
						<Profile.Photo src={defaultUser} />
					</div>
				</Dropdown.Root>
			</div>
		</div>
	);
}
