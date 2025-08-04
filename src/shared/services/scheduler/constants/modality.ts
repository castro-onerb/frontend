export const modalityMap = {
  in_person: {
		title: 'Presencial',
		color: 'pink'
	},
  telemedicine: {
		title: 'Telemedicina',
		color: 'primary'
	},
  unknown: {
		title: 'Desconhecido',
		color: 'slate'
	},
} as const;

export type ModalityType = typeof modalityMap[keyof typeof modalityMap]
