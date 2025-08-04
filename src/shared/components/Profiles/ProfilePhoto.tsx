import clsx from 'clsx';

interface IProfilePhotoProps {
	src: string;
	alt?: string;
	className?: string;
}

export function ProfilePhoto({ src, alt, className }: IProfilePhotoProps) {
	return (
		<div
			className={clsx(
				'rounded-full overflow-hidden max-w-[48px] flex items-center justify-center',
				className,
			)}
		>
			<img className='w-full h-full object-cover' src={src} alt={alt} />
		</div>
	);
}
