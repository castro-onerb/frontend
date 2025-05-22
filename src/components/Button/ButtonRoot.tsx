import type { ReactNode, ButtonHTMLAttributes } from "react";

interface IButtonRootProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
}

export function ButtonRoot({ children, className, ...props }: IButtonRootProps) {
  return (
    <button
      {...props}
      className={`relative w-fit min-w-[140px] overflow-hidden flex gap-2 items-center justify-center p-4 bg-primary-500 hover:bg-primary-600 rounded-[6px] font-medium text-white cursor-pointer transition ${className}`}
    >
      {children}
    </button>
  );
}
