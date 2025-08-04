interface IProfileLegendProps {
	value: string;
}

export function ProfileLegend({ value }: IProfileLegendProps) {
	return <span className='text-sm text-slate-600 leading-none'>{value}</span>;
}
