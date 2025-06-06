import LogoHorizontal from '@/assets/img/business/logo-horizontal-color.svg';
import { NavbarListLinks } from './NavbarListLinks';
import { NavbarProfile } from './NavbarProfile';

export function NavbarDesktop () {
  return (
    <div className="p-6 py-5 flex-1 flex flex-col gap-6 items-stretch max-w-[240px] bg-white">
      <div>
        <img
          src={LogoHorizontal}
          className='max-h-10' />
      </div>
      <NavbarListLinks />
      <div className="border-t border-slate-200 pt-4">
        <NavbarProfile />
      </div>
    </div>
  );
}
