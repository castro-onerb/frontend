export const priorityMap = {
	normal: {
		title: 'Normal',
    legend: 'Atendimento normal',
		color: 'emerald'
	},
	priority: {
		title: 'Prioridade',
    legend: 'Atendimento prioritário',
		color: 'pink'
	},
	special: {
		title: 'P. Especial',
    legend: 'Atendimento com prioridade especial',
		color: 'purple'
	},
	urgent: {
		title: 'Urgência',
    legend: 'Atendimento urgente',
    color: 'red',
	}
} as const;

export type PriorityType = typeof priorityMap[keyof typeof priorityMap];
