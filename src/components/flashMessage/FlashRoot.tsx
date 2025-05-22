import { Icon } from "@iconify/react/dist/iconify.js";
import type { ReactNode } from "react";

type FlashVariant = "success" | "info" | "alert" | "error";

interface IFlashRootProps {
  children: ReactNode;
  className?: string;
  variant?: FlashVariant;
  onClose?: () => void;
}

const variantClasses: Record<FlashVariant, string> = {
  success: "border-green-500 bg-green-50 text-green-800",
  info: "border-blue-500 bg-blue-50 text-blue-800",
  alert: "border-yellow-500 bg-yellow-50 text-yellow-800",
  error: "border-red-500 bg-red-50 text-red-800",
};

export function FlashRoot({
  children,
  className = "",
  variant = "info",
  onClose
}: IFlashRootProps) {
  const variantClass = variantClasses[variant];

  return (
    <div className={`w-full flex justify-between my-2 p-2 py-4 border-l-2 text-sm ${variantClass} ${className}`}>
      {children}
      {onClose && (
        <span onClick={onClose} className="h-fit p-1 cursor-pointer"><Icon icon={`mingcute:close-fill`} /></span>
      )}
    </div>
  );
}
