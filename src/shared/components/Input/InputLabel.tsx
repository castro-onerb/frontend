interface ILabelProps {
  required?: boolean;
  text?: string;
}

export function InputLabel({ text, required = false }: ILabelProps) {
  return (
    <p>{text} {required && <span className='text-red-500'>*</span>}</p>
  )
}
