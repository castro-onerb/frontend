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
      className="relative flex items-center gap-2 border border-slate-200 focus-within:border-primary-500 rounded-lg transition">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="text-base leading-none flex-1 p-2.5 outline-none"
        {...props}
        />
      {children}
    </div>
  )
}