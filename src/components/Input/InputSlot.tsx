import type { ReactNode } from "react";

interface InputSlotProps {
  children: ReactNode;
}

export function InputSlot({ children }: InputSlotProps) {

  return (
    <div className={`relative flex items-center`}>
      {children}
    </div>
  );
}
