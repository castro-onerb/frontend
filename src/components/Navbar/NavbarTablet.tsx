import { useState } from 'react';
import LogoSymbol from '@/assets/img/business/logo-symbol-color.svg';
import { Icon } from '../Icon/Icon';
import { NavbarLink } from './NavbarListLinks';
import { NavbarExit } from './NavbarExit';
import { NavbarDesktop } from './NavbarDesktop';

export function TabletNavbar() {

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-2 py-5 flex-1 flex flex-col gap-6 items-stretch bg-white relative">
      <img
        src={LogoSymbol}
        className='max-h-12' />
      <div className="w-6 h-6 flex items-center justify-center text-primary-500 hover:text-primary-700 rounded-full bg-white shadow-lg hover:shadow-sm border border-neutral-200 absolute top-16 -right-3 cursor-pointer transition" onClick={handleOpenNavbar}>
        <Icon name='chevron-right' size={24} />
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <NavbarLink className='justify-center' icon='file-list' link='/home' title='Página inicial' />
        <NavbarLink className='justify-center' icon='preferences' link='/preferences' title='Preferências do usuário' />
      </div>
      <NavbarExit />
      {isOpen && <div className="fixed inset-0 flex bg-black/50 z-10 cursor-pointer" onClick={(e) => e.target === e.currentTarget ? handleOpenNavbar() : false}>
        <NavbarDesktop />
      </div>}
    </div>
  );
}