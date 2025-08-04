import { useViewport } from '@/shared/utils/viewport-bool';
import { NavbarMobile } from './devices/NavbarMobile';
import { NavbarTablet } from './devices/NavbarTablet';
import { NavbarNotebook } from './devices/NavbarNotebook';

interface INavbarRootProps {
	devices?: {
		view: 'mobile' | 'tablet' | 'default';
		enabled?: boolean;
		force?: boolean;
		context?: string;
	}[];
	className?: string;
}

export function NavbarRoot({ devices, className }: INavbarRootProps) {
	const { mobile, tablet } = useViewport();

	if (!devices || devices.length === 0)
		return <NavbarNotebook className={className} contextKey='default' />;

	const match = {
		mobile: devices.find((d) => d.view === 'mobile'),
		tablet: devices.find((d) => d.view === 'tablet'),
		default: devices.find((d) => d.view === 'default'),
	};

	// Forçados
	if (match.mobile?.force && match.mobile.enabled)
		return <NavbarMobile className={className} contextKey={match.mobile.context ?? 'default'} />;
	if (match.tablet?.force && match.tablet.enabled)
		return <NavbarTablet className={className} contextKey={match.tablet.context ?? 'default'} />;
	if (match.default?.force && match.default.enabled)
		return <NavbarNotebook className={className} contextKey={match.default.context ?? 'default'} />;

	// Viewport
	if (match.mobile?.enabled && mobile)
		return <NavbarMobile className={className} contextKey={match.mobile.context ?? 'default'} />;
	if (match.tablet?.enabled && tablet)
		return <NavbarTablet className={className} contextKey={match.tablet.context ?? 'default'} />;
	if (match.default?.enabled && !tablet)
		return <NavbarNotebook className={className} contextKey={match.default.context ?? 'default'} />;

	return null;
}
