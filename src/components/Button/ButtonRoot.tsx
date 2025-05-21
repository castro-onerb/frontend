import type { ReactNode, ButtonHTMLAttributes } from "react";

interface IButtonRootProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export function ButtonRoot({ children, ...props }: IButtonRootProps) {
  return (
    <button
      {...props}
      className="relative overflow-hidden flex gap-2 items-center justify-center p-4 bg-primary-500 hover:bg-primary-600 rounded-lg font-medium text-white cursor-pointer transition"
    >
      {children}
    </button>
  );
}
