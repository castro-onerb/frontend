const STORAGE_KEY = 'scheduler-date';

export function saveSchedulerDate(month: number, year: number) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify({ month, year }));
}

export function getStoredSchedulerDate(): { month: number; year: number } | null {
	const stored = localStorage.getItem(STORAGE_KEY);
	if (!stored) return null;
	try {
		return JSON.parse(stored) as { month: number; year: number };
	} catch {
		return null;
	}
}
