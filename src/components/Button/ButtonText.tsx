import type { ReactNode } from "react";

interface IButtonTextProps {
  children: ReactNode;
}

export function ButtonText({ children }: IButtonTextProps) {
  return (
    <span className="z-1">{children}</span>
  )
}
