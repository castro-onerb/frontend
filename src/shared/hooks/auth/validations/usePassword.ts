import { useState } from 'react';

interface PasswordErrors {
  password?: string;
  confirmPassword?: string;
}

export function usePassword() {
  const [errors, setErrors] = useState<PasswordErrors>({});

  const validate = (password: string, confirmPassword?: string): boolean => {
    const newErrors: PasswordErrors = {};

    if (password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres.';
    }

    if (!/[A-Z]/.test(password)) {
      newErrors.password = 'A senha deve conter ao menos uma letra maiúscula.';
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      newErrors.password = 'A senha deve conter ao menos um símbolo.';
    }

    if (hasSequentialNumbers(password)) {
      newErrors.password = 'A senha não deve conter números sequenciais.';
    }

    if (confirmPassword !== undefined && password !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return {
    validate,
    errors,
    setErrors,
  };
}

// Detecta sequências ascendentes ou descendentes de 3 dígitos
function hasSequentialNumbers(value: string): boolean {
  for (let i = 0; i < value.length - 2; i++) {
    const a = value.charCodeAt(i);
    const b = value.charCodeAt(i + 1);
    const c = value.charCodeAt(i + 2);

    if (isDigit(a) && isDigit(b) && isDigit(c)) {
      const d1 = a - 48;
      const d2 = b - 48;
      const d3 = c - 48;

      const isAscending = d2 === d1 + 1 && d3 === d2 + 1;
      const isDescending = d2 === d1 - 1 && d3 === d2 - 1;

      if (isAscending || isDescending) return true;
    }
  }
  return false;
}

function isDigit(charCode: number): boolean {
  return charCode >= 48 && charCode <= 57;
}
