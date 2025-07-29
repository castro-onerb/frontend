import clsx from 'clsx';
import UserDefault from '@/assets/img/user-default.svg';
import { Dropdown } from '@/components/Dropdown/Dropdown';
import { useLogout } from '@/hooks/auth/logout/useLogout';
import { useAuthUser } from '@/auth/hooks/useAuthUser';

interface NavbarPhotoProps {
  imageSrc?: string;
  alt?: string;
  borderColor?: string;
}

function NavbarPhoto({
  imageSrc,
  alt = 'Profile photo',
  borderColor = 'before:border-primary-500',
}: NavbarPhotoProps) {
  return (
    <div
      className={clsx(
        'relative w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center',
        'before:absolute before:rounded-full before:w-11 before:aspect-square before:border',
        borderColor
      )}
    >
      <div className="w-full h-full rounded-full overflow-hidden">
        <img src={imageSrc ?? UserDefault} alt={alt} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

interface NavbarProfileProps {
  name?: string;
  description?: string;
  imageSrc?: string;
  hideText?: boolean;
}

export function NavbarProfile({
  name,
  description,
  imageSrc,
  hideText = false,
}: NavbarProfileProps) {
  const { handleLogout } = useLogout();

  const user = useAuthUser();
  const userName = name ?? user?.name ?? 'Usuário';
  const userRole: string = description ?? (
    user?.role === 'operator'
      ? 'Atendente'
      : user?.role === 'medical'
      ? 'Médico'
      : ''
  );

  return (
    <Dropdown placement='bottom-start'>
      <Dropdown.Trigger>
        <button
          className="flex gap-2.5 items-center group focus:outline-none w-full md:hover:bg-slate-100 p-2 rounded-3xl cursor-pointer transition">
          <NavbarPhoto imageSrc={imageSrc} />
          {!hideText && userName && (
            <div className="flex flex-col gap-0.5 text-left">
              <p className="text-sm font-semibold text-neutral-700">{userName}</p>
              {userRole && (
                <p className="text-xs font-medium text-neutral-500">{userRole}</p>
              )}
            </div>
          )}
        </button>
      </Dropdown.Trigger>

      <Dropdown.Content className='p-3'>
        <div className="flex flex-col text-sm text-neutral-700 min-w-[180px]">
          <a
            href="/profile"
            className="hover:bg-neutral-100 rounded p-2 transition"
          >
            Meu perfil
          </a>
          <a
            href="/preferences"
            className="hover:bg-neutral-100 rounded p-2 transition"
          >
            Preferências
          </a>
          <button
            onClick={() => void handleLogout()}
            className="text-left text-red-600 hover:bg-neutral-100 rounded p-2 transition"
          >
            Sair
          </button>
        </div>
      </Dropdown.Content>
    </Dropdown>
  );
}
