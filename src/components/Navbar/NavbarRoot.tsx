import { useViewport } from '@/utils/ViewportBool';
import { NavbarMobile } from './NavbarMobile';
import { TabletNavbar } from './NavbarTablet';
import { NavbarDesktop } from './NavbarDesktop';

export default function NavbarRoot() {
  const { viewer } = useViewport(1240, 900);

  if (viewer[1]) return <NavbarMobile />;
  if (viewer[0]) return <TabletNavbar />;
  return <NavbarDesktop />;
}
