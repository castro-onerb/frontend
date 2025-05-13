import { Icon } from '@iconify/react'
interface IIconProps {
  icon: string;
  size?: number;
}

export function InputIcon({ icon, size = 18 }: IIconProps) {
  return (
    <Icon
        className="text-neutral-400"
        icon={icon}
        style={{ fontSize: size }}
      />
  )
}