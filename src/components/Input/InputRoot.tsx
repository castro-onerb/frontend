import type { HTMLAttributes, ReactNode } from "react";

interface IRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function InputRoot({ children, ...props }: IRootProps) {
  return(
    <div {...props} className="flex flex-col gap-1">
      {children}
    </div>
  );
}
