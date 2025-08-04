export const genderMap = {
	male: 'Masculino',
	female: 'Feminino',
	other: 'Outro'
};

export type GenderType = typeof genderMap[keyof typeof genderMap];
