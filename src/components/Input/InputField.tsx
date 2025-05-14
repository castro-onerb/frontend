import type { InputHTMLAttributes, ReactNode } from "react";

interface IFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  
  placeholder?: string;
  children?: ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputField({ placeholder, children, value, onChange, ...props }: IFieldProps) {
  return (
    <div
      className="relative flex items-center px-2 gap-2 border border-slate-400 rounded-lg transition">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex-1 py-4 outline-none"
        {...props}
        />
      {children}
    </div>
  )
}