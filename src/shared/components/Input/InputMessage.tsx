interface IMessageProps {
  text: string;
  type?: 'error';
}

export function InputMessage({ text, type = 'error' }: IMessageProps) {

  const typeCss = [
    { type: 'error', css: 'text-red-500' }
  ];

  return (
    <span className={`text-sm font-medium ${typeCss.find(item => item.type === type)?.css}`}>{text}</span>
  )
}