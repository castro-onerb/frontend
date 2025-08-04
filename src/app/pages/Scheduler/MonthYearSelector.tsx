import { useState } from 'react';
import { Dropdown } from '@/shared/components/Dropdown/Dropdown';
import { Button } from '@/shared/components/Button/Button';
import { Icon } from '@/shared/components/Icon/Icon';
import clsx from 'clsx';

const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril',
  'Maio', 'Junho', 'Julho', 'Agosto',
  'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

export function MonthYearSelector({
  selectedMonth,
  selectedYear,
  onSelect,
}: {
  selectedMonth: number;
  selectedYear: number;
  onSelect: (month: number, year: number) => void;
}) {
  const [year, setYear] = useState(selectedYear);

  return (
    <Dropdown.Root
      dropdown={
        <div className="p-2 w-64 bg-white rounded-2xl shadow-2xl flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <Button.Root size="xsmall" variant='text' onClick={() => setYear((y) => y - 1)}>
              <Icon name="chevron-left" />
            </Button.Root>
            <span className="font-semibold text-sm text-slate-700">{year}</span>
            <Button.Root size="xsmall" variant='text' onClick={() => setYear((y) => y + 1)}>
              <Icon name="chevron-right" />
            </Button.Root>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-2 overflow-y-auto">
            {MONTHS.map((month, idx) => (
              <button
                key={month}
                onClick={() => onSelect(idx, year)}
                className={clsx(
                  'text-sm py-1 px-2 rounded cursor-pointer',
                  idx === selectedMonth && year === selectedYear
                    ? 'bg-primary-500 text-white font-semibold hover:bg-primary-700'
                    : 'text-slate-700 hover:bg-slate-100'
                )}
              >
                {month}
              </button>
            ))}
          </div>
        </div>
      }
    >
      <Button.Root variant="text" corner="pill" size="small" color="slate">
        {MONTHS[selectedMonth]}
      </Button.Root>
    </Dropdown.Root>
  );
}
