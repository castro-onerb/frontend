import clsx from 'clsx';
import {
  createContext,
  useContext,
  type ReactNode,
} from 'react';
import { Dropdown } from '../Dropdown/Dropdown';
import { Icon } from '../Icon/Icon';
import { DropdownContext } from '../Dropdown/DropdownRoot';

interface ISelectContext {
  selected: string;
  setSelected: (value: string) => void;
}

interface ISelectTriggerProps {
  placeholder?: string;
	className?: string;
  value: string;
  onChange: (value: string) => void;
  dropdown?: ReactNode;
}

const SelectContext = createContext<ISelectContext | null>(null);

export function InputSelect({ placeholder = 'Selecione', value, onChange, dropdown, className }: ISelectTriggerProps) {

  return (
    <SelectContext.Provider value={{ selected: value, setSelected: onChange }}>
			<Dropdown.Root placement='bottom-start' dropdown={dropdown}>
				<div
					className={clsx('relative flex items-center px-2 py-1 bg-primary-500 hover:bg-primary-600 cursor-pointer transition', className)}>
					<span className="select-none text-white flex gap-2 items-center">
						{value || placeholder}
						<Icon name='chevron-down' />
					</span>
				</div>
			</Dropdown.Root>
    </SelectContext.Provider>
  );
}

interface ISelectItemObject {
  value: string;
  label: string;
}

interface ISelectItemsProps {
  items: ISelectItemObject[];
  render?: (item: ISelectItemObject, selected: boolean) => ReactNode;
}

export function InputSelectItems({ items, render }: ISelectItemsProps) {
  const context = useContext(SelectContext);
	
	const dropdown = useContext(DropdownContext);

  if (!context) return null;

  const { setSelected, selected } = context;

	const handleClick = (value: string) => {
		setSelected(value);
		dropdown?.setOpen(false);
	};

  return (
    <div className={clsx('bg-white p-1 shadow-lg rounded-xl border border-zinc-200 z-10 overflow-auto max-h-64 box-scrollbar')}>
      {items.map((item) => {
        const isSelected = selected === item.value;

        return (
          <div
            key={item.value}
            onClick={() => handleClick(item.value)}
            className={clsx(
              'cursor-pointer px-3 py-2 rounded-md hover:bg-zinc-100 transition',
              isSelected && 'bg-primary-50 text-primary-700 font-medium'
            )}
          >
            {render ? render(item, isSelected) : item.label}
          </div>
        );
      })}
			<div className="sticky bg-white -bottom-1 p-1 flex justify-center">
				<Icon name='chevron-down' />
			</div>
    </div>
  );
}
