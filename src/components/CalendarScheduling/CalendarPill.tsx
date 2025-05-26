interface CalendarPillProps {
  type: number;
}

export function CalendarPill({ type }: CalendarPillProps) {
  const variantClasses: Record<number, string> = {
    0: "border-red-500 bg-red-50 text-red-800",
    1: "border-green-500 bg-green-50 text-green-800",
    2: "border-blue-500 bg-blue-50 text-blue-800",
    3: "border-yellow-500 bg-yellow-50 text-yellow-800",
  };

  const variantClass = variantClasses[type];

  return (
    <span className={`text-[12px] font-semibold leading-none p-1 rounded-full text-white ${variantClass}`}>P. Special</span>
  )
}