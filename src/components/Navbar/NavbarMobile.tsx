import { Icon } from '../Icon/Icon';
import { NavbarProfile } from './NavbarProfile';

export function NavbarMobile() {

  return (
    <div className="bg-white mx-4 p-3 rounded-2xl flex items-center justify-between">
      <NavbarProfile />
      <a
        href="/preferences"
        className="w-8 aspect-square flex items-center justify-center border border-slate-400 rounded-lg"
      >
        <Icon name="preferences" />
      </a>
    </div>
  );
}
