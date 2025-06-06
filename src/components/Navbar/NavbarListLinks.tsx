import clsx from 'clsx';
import { Icon } from '../Icon/Icon';
import type { IconKey } from '../Icon/icon-reference';

export function NavbarListLinks() {
  return (
    <div className="flex flex-col gap-2 flex-1">
      <NavbarLink label='Dashboard' icon='dashboard' link='/' />
      <NavbarLink label='Agenda' icon='scheduler' link='/scheduler' />
      <NavbarLink label='Todos os exames' icon='file-list' link='/home' />
    </div>
  );
}

interface NavbarLinkProps {
  icon: IconKey;
  label?: string;
  link?: string;
  title?: string;
  className?: string;
  isActive?: boolean;
}

export function NavbarLink({
  icon,
  label,
  link,
  title,
  className,
  isActive,
}: NavbarLinkProps) {
  const active = isActive ?? window.location.pathname === link;

  return (
    <a
      href={link}
      title={title}
      className={clsx(
        'p-3 py-3 flex gap-2 items-center text-sm rounded-lg font-semibold text-neutral-500 hover:bg-neutral-100 transition',
        active && 'bg-primary-500 text-white hover:bg-primary-600',
        className
      )}
    >
      <Icon name={icon} />
      {label}
    </a>
  );
}
