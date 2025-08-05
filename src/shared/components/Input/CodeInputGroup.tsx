import { useEffect, useRef, useState } from 'react';
import { CodeInputField } from './CodeInputField';

export interface CodeInputProps {
  length?: number;
  onChange?: (value: string) => void;
  autoFocus?: boolean;
  autoComplete?: string;
  name?: string;
  value?: string;
}

export function CodeInputGroup({
  length = 6,
  onChange,
  autoFocus,
  autoComplete = 'off',
  name = 'code',
	value
}: CodeInputProps) {

  const [values, setValues] = useState<string[]>(
		value ? value.toUpperCase().split('').slice(0, length) : Array(length).fill('')
	);

	
	useEffect(() => {
		if (value) {
			const newValues = value.toUpperCase().split('').slice(0, length);
			setValues((prev) => {
				const current = prev.join('');
				if (current !== newValues.join('')) {
					return newValues;
				}
				return prev;
			});
		}
	}, [value, length]);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^[a-zA-Z0-9]?$/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value.toUpperCase();
    setValues(newValues);
    onChange?.(newValues.join(''));

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2">
      {values.map((val, i) => (
        <CodeInputField
          key={i}
          ref={(el) => { inputsRef.current[i] = el; }}
          value={val}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          name={`${name}[${i}]`} // nome individual para cada input
          autoFocus={autoFocus && i === 0}
          autoComplete={autoComplete}
          inputMode="text"
        />
      ))}
    </div>
  );
}
