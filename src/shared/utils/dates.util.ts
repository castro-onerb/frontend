export function FormatDate(date: string) {
	const meses = [
		'Janeiro',
		'Fevereiro',
		'Março',
		'Abril',
		'Maio',
		'Junho',
		'Julho',
		'Agosto',
		'Setembro',
		'Outubro',
		'Novembro',
		'Dezembro',
	];

	const parseISO = (input: string) => {
		const match = input.match(/^(\d{4})[-/](\d{2})[-/](\d{2})/);
		if (!match) return null;
		const [, ano, mes, dia] = match;
		return { dia, mes, ano };
	};

	const parseBR = (input: string) => {
		const match = input.match(/^(\d{2})[-/](\d{2})[-/](\d{4})/);
		if (!match) return null;
		const [, dia, mes, ano] = match;
		return { dia, mes, ano };
	};

	const parseDIAEXT = (input: string) => {
		const match = input.match(/^(\d{1,2}) de ([A-Za-zçÇ]+)( de (\d{4}))?/i);
		if (!match) return null;
		const [, dia, mesExt, , ano = new Date().getFullYear().toString()] = match;
		const mes = (
			meses.findIndex((m) => m.toLowerCase() === mesExt.toLowerCase()) + 1
		)
			.toString()
			.padStart(2, '0');
		return { dia: dia.padStart(2, '0'), mes, ano };
	};

	// Auto detect: ordem segura
	const parts = parseISO(date) || parseBR(date) || parseDIAEXT(date);
	if (!parts) return { 'ISO': date, 'BR': date, 'DIAEXT': date };

	const { dia, mes, ano } = parts;
	const mesExt = meses[parseInt(mes) - 1];

	const formats = {
		'ISO': `${ano}/${mes}/${dia}`,
		'BR': `${dia}/${mes}/${ano}`,
		'DIAEXT': `${dia} de ${mesExt}`,
	};

	return formats;
}

export function formatHourRange(start: Date, end: Date): string {
	const formatHour = (date: Date) => {
		const hour = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');
		return `${hour}:${minutes}`;
	};

	const startText = formatHour(start);
	const endText = formatHour(end);

	return `${startText} - ${endText}`;
}
