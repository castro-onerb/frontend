import type { ReactNode } from "react";

interface IButtonRootProps {
  children?: ReactNode;
  onClick?: () => void;
}

export function ButtonRoot({ children, onClick }: IButtonRootProps) {
  return (
    <div
      onClick={onClick}
      className="relative overflow-hidden flex gap-2 items-center justify-center p-4 bg-primary-500 hover:bg-primary-600 rounded-lg font-medium text-white cursor-pointer transition">
      {children}
    </div>
  );
}