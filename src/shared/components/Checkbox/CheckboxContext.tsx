import { createContext, useContext } from 'react';

interface CheckboxContextType {
  id?: string;
  disabled?: boolean;
}

export const CheckboxContext = createContext<CheckboxContextType | null>(null);

export const useCheckboxContext = () => {
  const context = useContext(CheckboxContext);
  if (!context) throw new Error('useCheckboxContext deve ser usado dentro de <Checkbox.Root>');
  return context;
};
