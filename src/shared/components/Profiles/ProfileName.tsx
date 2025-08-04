interface INameProps {
	value: string;
}

export function ProfileName({ value }: INameProps) {
	return <p className='font-medium leading-none'>{value}</p>;
}
