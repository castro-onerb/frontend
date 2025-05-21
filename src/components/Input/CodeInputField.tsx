import { forwardRef } from "react";

export const CodeInputField = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        maxLength={1}
        className="w-12 h-12 flex-1 text-center border border-gray-400 rounded-md text-lg outline-none"
        {...props}
      />
    );
  }
);
