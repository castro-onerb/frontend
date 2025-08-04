import { useViewport } from '@/shared/utils/viewport-bool';

interface ILogoDevice {
	view: 'mobile' | 'tablet' | 'default';
	force?: boolean;
	enabled?: boolean;
}

interface ILogoDinamicProps {
	prefix?: string;
	alt?: string;
	useMetaGlob?: boolean;
	fallbackPrefix?: string;
	className?: string;
	devices?: ILogoDevice[];
}

export function LogoDinamic({
	prefix,
	alt,
	useMetaGlob = false,
	fallbackPrefix,
	className,
	devices,
}: ILogoDinamicProps) {
	const { mobile, tablet } = useViewport();

	const safePrefix = prefix || 'deovita';
	const fallback = fallbackPrefix || 'deovita';

	const logoSize = getLogoSize(devices, mobile, tablet);
	const safeSizeLogo = `logo-${logoSize}.svg`;

	if (!useMetaGlob) {
		return (
			<img
				src={`assets/business/${safePrefix}/${safeSizeLogo}`}
				alt={alt}
				className={className}
			/>
		);
	}

	const logos = import.meta.glob('/src/assets/business/**/logo-*.svg', {
		eager: true,
		query: '?url',
		import: 'default',
	});

	const pathKey = `/src/assets/business/${safePrefix}/${safeSizeLogo}`;
	const path = logos[pathKey] as string | undefined;

	return (
		<img
			src={path || `assets/business/${fallback}/${safeSizeLogo}`}
			alt={alt}
			className={className}
		/>
	);
}

function getLogoSize(
	devices: ILogoDevice[] | undefined,
	mobile: boolean,
	tablet: boolean,
): 'mobile' | 'tablet' | 'desktop' {
	if (!devices || devices.length === 0) {
		if (mobile) return 'mobile';
		if (tablet) return 'tablet';
		return 'desktop';
	}

	const match = {
		mobile: devices.find((d) => d.view === 'mobile'),
		tablet: devices.find((d) => d.view === 'tablet'),
		default: devices.find((d) => d.view === 'default'),
	};

	if (match.mobile?.force && match.mobile.enabled) return 'mobile';
	if (match.tablet?.force && match.tablet.enabled) return 'tablet';
	if (match.default?.force && match.default.enabled) return 'desktop';

	if (match.mobile?.enabled && mobile) return 'mobile';
	if (match.tablet?.enabled && tablet) return 'tablet';
	if (match.default?.enabled && !tablet) return 'desktop';

	return 'mobile';
}
