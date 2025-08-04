/**
 * Utilitários para validação de documentos e dados
 */

/**
 * Valida se um CPF é válido seguindo o algoritmo oficial
 * @param cpf - CPF com ou sem formatação
 * @returns true se o CPF for válido, false caso contrário
 */
export const validateCPF = (cpf: string): boolean => {
	const numbers = cpf.replace(/\D/g, '');

	if (numbers.length !== 11) return false;
	if (/^(\d)\1{10}$/.test(numbers)) return false; // CPF com todos os dígitos iguais

	let sum = 0;
	for (let i = 0; i < 9; i++) {
		sum += parseInt(numbers.charAt(i)) * (10 - i);
	}
	let remainder = (sum * 10) % 11;
	if (remainder === 10 || remainder === 11) remainder = 0;
	if (remainder !== parseInt(numbers.charAt(9))) return false;

	sum = 0;
	for (let i = 0; i < 10; i++) {
		sum += parseInt(numbers.charAt(i)) * (11 - i);
	}
	remainder = (sum * 10) % 11;
	if (remainder === 10 || remainder === 11) remainder = 0;
	if (remainder !== parseInt(numbers.charAt(10))) return false;

	return true;
};

/**
 * Aplica formatação de CPF (000.000.000-00)
 * @param value - Valor a ser formatado
 * @returns CPF formatado
 */
export const formatCPF = (value: string): string => {
	let formattedValue = value.replace(/\D/g, '');
	formattedValue = formattedValue.replace(/(\d{3})(\d)/, '$1.$2');
	formattedValue = formattedValue.replace(/(\d{3})(\d)/, '$1.$2');
	formattedValue = formattedValue.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
	return formattedValue;
};

/**
 * Remove formatação do CPF, retornando apenas números
 * @param cpf - CPF formatado
 * @returns CPF apenas com números
 */
export const cleanCPF = (cpf: string): string => {
	return cpf.replace(/\D/g, '');
};
