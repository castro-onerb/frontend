import { NavbarMobile } from './devices/NavbarMobile';
import { NavbarNotebook } from './devices/NavbarNotebook';
import { NavbarTablet } from './devices/NavbarTablet';
import { NavbarLink } from './NavbarLink';
import { NavbarLogic } from './NavbarLogic';
import { NavbarRoot } from './NavbarRoot';

export const Navbar = {
	Root: NavbarRoot,
	Logic: NavbarLogic,
	Mobile: NavbarMobile,
	Tablet: NavbarTablet,
	Notebook: NavbarNotebook,
	Link: NavbarLink,
};
