import { type ReactNode } from "react";

interface HeroCardProps {
  children?: ReactNode;
  className?: string;
}

export function HeroCard({ children, className = "" }: HeroCardProps) {
  return (
    <div className={`flex-1 h-full p-6 text-white text-xl flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
}
